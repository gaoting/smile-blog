import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "./article.entity";
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
// import { http } from "src/common/http";
// const multer = require("multer");
// const fs = require("fs");
const fsExtra = require("fs-extra");
const fileRootPath = "./images";
const glob = require("glob");
// import { getNowTime } from "../filters/time";
import * as dayjs from "dayjs";
import { CreateDto } from "./create.dto";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleService: Repository<Article>
  ) {}

  // 查询全部列表 带分页
  async findAll(query?: any): Promise<any> {
    const qb = await this.articleService.createQueryBuilder("article");
    qb.where("1=1");
    qb.orderBy("article.createTime", "DESC");

    const total = await qb.getCount();
    const { current, pageSize, ...params } = query;
    qb.limit(pageSize);
    qb.andWhere(params);
    qb.offset(pageSize * (current - 1));

    const posts = await qb.getMany();

    let data = {
      list: posts,
      total: total,
      pageSize: pageSize,
      current: current,
      code: 200,
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
    console.log(nextData, "nnnnnnnnnnnnnnn");

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
    article.activeKey = obj.activeKey;
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
    const { id, ...params } = obj;
    const qb = this.articleService
      .createQueryBuilder("article")
      .where("article.id=:id")
      .setParameter("id", id);

    const result = await qb.getOne();
    if (!result)
      throw new HttpException(`id为${id}的文章不存在`, HttpStatus.BAD_REQUEST);
    await this.articleService.update(id, params);

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
