import fetch from "node-fetch";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "./article.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
const fsExtra = require("fs-extra");
const fileRootPath = "./images";
const glob = require("glob");
import * as dayjs from "dayjs";
import { CreateDto } from "./create.dto";
import { MessageBoardService } from "./../messageBoard/messageboard.service";
import { MessageBoard } from "./../messageBoard/messageboard.entity";
import fs from "fs";
import cheerio from "cheerio";
import axios from "axios";

import * as path from "path";
import { join } from "path";

const multer = require("multer");
import { createWriteStream } from "fs";

let flowNum = 0;

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleService: Repository<Article>,

    @InjectRepository(MessageBoard)
    private readonly messageBoardService: Repository<MessageBoard>
  ) {}

  // 天气

  async weather() {
    const api = "https://tianqi.moji.com/weather/china/shanghai/shanghai";
    let dataas = await axios.get(api);
    let $ = cheerio.load(dataas.data);
    let temp = $(".wea_weather em").text().trim() + "℃";
    let desc = $(".wea_weather b").text().trim();
    let water = $(".wea_about span").text().trim();
    let win = $(".wea_about em").text().trim();
    let tips = $(".wea_tips em").text().trim();
    let city = $(".search_default em").text().trim();
    let imgs = $(".wea_weather span img").attr("src");

    console.log("[dataas  ] >", dataas);

    console.log("[ imgs ] >", imgs);
    const imgDir = join(__dirname, "public");

    let arr = imgs.split("/");
    this.downloadFile(imgs, arr[arr.length - 1]);

    let words = [
      `${imgs}`,
      `今日: ${city}`,
      `天气: ${desc}`,
      `温度：${temp}`,
      `湿度：${water}`,
      `风力：${win}`,

      tips,
    ];
    console.log("[ words ] >", words);
    return words;
  }
  // 存储到本地public
  async downloadFile(uri, name) {
    let filePath = `public/${name}`;
    let res = await axios({ url: uri, responseType: "stream" });
    let ws = createWriteStream(filePath);
    res.data.pipe(ws);
    res.data.on("close", () => {
      ws.close();
    });
  }

  // 查询全部列表 带分页
  async findAll(query?: any): Promise<any> {
    console.log("[ aaaaaaa ] >");
    const qb = await this.articleService.createQueryBuilder("article");
    qb.where("1=1");

    qb.orderBy("article.createTime", "DESC");

    const total = await qb.getCount();
    const { current, pageSize, ...params } = query;
    qb.limit(pageSize);
    // qb.andWhere(params);
    if (query.tags) {
      const { tags } = query;
      qb.andWhere("article.tags=:tags", { tags });
    }
    if (query.types) {
      const { types } = query;
      qb.andWhere("article.types=:types", { types });
    }

    qb.offset(pageSize * (current - 1));

    const posts = await qb.getMany();
    const messagesNum = await this.messageBoardService
      .createQueryBuilder("MessageBoard")
      .where("1=1")
      .getCount();

    flowNum++;

    let data = {
      list: posts,
      total: +total,
      pageSize: +pageSize,
      current: +current,
      code: 200,
      flowNum: flowNum,
      messagesNum: messagesNum,
      weather: await this.weather(),
    };

    return params.id ? posts[0] : data;
  }

  // 获取指定id
  async findById(id: number): Promise<any> {
    const qb = this.articleService
      .createQueryBuilder("article")
      .where("article.id=:id")
      .setParameter("id", id);

    console.log(qb.limit(1));

    const result = await qb.getOne();
    if (!result)
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    await this.articleService.update(id, { lookNum: result.lookNum + 1 });

    // 下一条
    let sql1 = `SELECT * FROM article WHERE id IN((SELECT id FROM article WHERE id<${id} ORDER BY id DESC LIMIT 1),(SELECT id FROM article WHERE id>${id} ORDER BY id LIMIT 1)) ORDER BY id`;
    const nextData = await this.articleService.query(sql1);

    if (nextData) {
      if (nextData[0]) {
        result.preId = nextData[0].id;
        result.preTitle = nextData[0].title;
      }
      if (nextData[1]) {
        result.nextId = nextData[1].id;
        result.nextTitle = nextData[1].title;
      }
    }

    return { data: result, code: 200 };
  }

  // 收藏
  async setLove(obj: any): Promise<any> {
    const { id, loveNum } = obj;
    await this.articleService.update(id, { loveNum: Math.abs(loveNum) });
    let data = await this.articleService.findOne({ where: { id } });
    return { data: data, code: 200 };
  }

  // 根据条件查询列表  不带分页
  async searchNum(query?: any): Promise<any> {
    let qb = this.articleService.createQueryBuilder("article");
    qb.where("1=1");
    if (query && query.orderByDesc) {
      switch (query.orderByDesc[0]) {
        case "lookNum":
          qb.orderBy("article.lookNum", "DESC");
          break;
        case "loveNum":
          qb.orderBy("article.loveNum", "DESC");
          break;
        default:
          qb.orderBy("article.createTime", "DESC");
      }
    }
    qb.addOrderBy("article.createTime", "DESC");
    qb.limit(10);

    const posts = await qb.getMany();

    return {
      list: posts,
      code: 200,
      total: posts.length,
    };
  }

  // 创建
  async add(obj: CreateDto): Promise<any> {
    const { title } = obj;
    const findResult = await this.articleService.findOne({ where: { title } });
    if (findResult) {
      throw new HttpException("文章标题已存在", HttpStatus.BAD_REQUEST);
    }
    let article = new Article();

    article.title = obj.title;
    article.tags = obj.tags;
    article.author = obj.author;
    article.types = obj.types;
    article.content = obj.content;

    article.picture = obj.picture;
    article.description = obj.description
      ? obj.description
      : obj.content?.substring(0, 300);
    await this.articleService.save(article);
    return {
      message: "创建ok",
      code: 200,
    };
  }

  // 更新
  async updated(obj: CreateDto): Promise<any> {
    const { id, title, tags, author, types, content } = obj;
    const result = await this.articleService.findOne({ where: { id } });

    if (!result) {
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    }
    let article = new Article();
    article.title = title;
    article.tags = tags;
    article.author = author;
    article.types = types;
    article.content = content;
    article.picture = obj.picture;
    article.description = obj.description
      ? obj.description
      : obj.content?.substring(0, 300);
    await this.articleService.update(id, article);

    return { list: result, code: 200, message: "修改ok" };
  }

  // 删除
  async delete(id): Promise<any> {
    let list = await this.articleService.delete(id);
    if (list) {
      return { message: "删除ok", data: {}, code: 200 };
    } else {
      return { message: "删除失败", data: {}, code: 500 };
    }
  }

  async findAllImg(): Promise<any> {
    // 获取图片列表api
    const files = glob.sync(`${fileRootPath}/upload/*`);
    const imageFiles = files.map((item) => {
      // 在这里是对获取的api列表做了一些处理方便前台读取
      return `/api/upload${item.split("image")[1]}`;
    });
    return { imageFiles, code: 200 };
  }

  removeImage(directoryPath: string) {
    fsExtra.removeSync(`${fileRootPath}/upload/${directoryPath}`);
  }
}
