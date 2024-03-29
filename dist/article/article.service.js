"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const article_entity_1 = require("./article.entity");
const common_1 = require("@nestjs/common");
const fsExtra = require("fs-extra");
const fileRootPath = "./images";
const glob = require("glob");
const messageboard_entity_1 = require("./../messageBoard/messageboard.entity");
const cheerio_1 = require("cheerio");
const axios_1 = require("axios");
const path_1 = require("path");
const multer = require("multer");
const fs_1 = require("fs");
let flowNum = 0;
let ArticleService = class ArticleService {
    constructor(articleService, messageBoardService) {
        this.articleService = articleService;
        this.messageBoardService = messageBoardService;
    }
    async weather() {
        const api = "https://tianqi.moji.com/weather/china/shanghai/shanghai";
        let dataas = await axios_1.default.get(api);
        let $ = cheerio_1.default.load(dataas.data);
        let temp = $(".wea_weather em").text().trim() + "℃";
        let desc = $(".wea_weather b").text().trim();
        let water = $(".wea_about span").text().trim();
        let win = $(".wea_about em").text().trim();
        let tips = $(".wea_tips em").text().trim();
        let city = $(".search_default em").text().trim();
        let imgs = $(".wea_weather span img").attr("src");
        console.log("[dataas  ] >", dataas);
        console.log("[ imgs ] >", imgs);
        const imgDir = (0, path_1.join)(__dirname, "public");
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
    async downloadFile(uri, name) {
        let filePath = `public/${name}`;
        let res = await (0, axios_1.default)({ url: uri, responseType: "stream" });
        let ws = (0, fs_1.createWriteStream)(filePath);
        res.data.pipe(ws);
        res.data.on("close", () => {
            ws.close();
        });
    }
    async findAll(query) {
        console.log("[ aaaaaaa ] >");
        const qb = await this.articleService.createQueryBuilder("article");
        qb.where("1=1");
        qb.orderBy("article.createTime", "DESC");
        const total = await qb.getCount();
        const { current, pageSize } = query, params = __rest(query, ["current", "pageSize"]);
        qb.limit(pageSize);
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
    async findById(id) {
        const qb = this.articleService
            .createQueryBuilder("article")
            .where("article.id=:id")
            .setParameter("id", id);
        console.log(qb.limit(1));
        const result = await qb.getOne();
        if (!result)
            throw new common_1.HttpException(`id为${id}的文章不存在`, common_1.HttpStatus.BAD_REQUEST);
        await this.articleService.update(id, { lookNum: result.lookNum + 1 });
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
    async setLove(obj) {
        const { id, loveNum } = obj;
        await this.articleService.update(id, { loveNum: Math.abs(loveNum) });
        let data = await this.articleService.findOne({ where: { id } });
        return { data: data, code: 200 };
    }
    async searchNum(query) {
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
    async add(obj) {
        var _a;
        const { title } = obj;
        const findResult = await this.articleService.findOne({ where: { title } });
        if (findResult) {
            throw new common_1.HttpException("文章标题已存在", common_1.HttpStatus.BAD_REQUEST);
        }
        let article = new article_entity_1.Article();
        article.title = obj.title;
        article.tags = obj.tags;
        article.author = obj.author;
        article.types = obj.types;
        article.content = obj.content;
        article.picture = obj.picture;
        article.description = obj.description
            ? obj.description
            : (_a = obj.content) === null || _a === void 0 ? void 0 : _a.substring(0, 300);
        await this.articleService.save(article);
        return {
            message: "创建ok",
            code: 200,
        };
    }
    async updated(obj) {
        var _a;
        const { id, title, tags, author, types, content } = obj;
        const result = await this.articleService.findOne({ where: { id } });
        if (!result) {
            throw new common_1.HttpException(`id为${id}的文章不存在`, common_1.HttpStatus.BAD_REQUEST);
        }
        let article = new article_entity_1.Article();
        article.title = title;
        article.tags = tags;
        article.author = author;
        article.types = types;
        article.content = content;
        article.picture = obj.picture;
        article.description = obj.description
            ? obj.description
            : (_a = obj.content) === null || _a === void 0 ? void 0 : _a.substring(0, 300);
        await this.articleService.update(id, article);
        return { list: result, code: 200, message: "修改ok" };
    }
    async delete(id) {
        let list = await this.articleService.delete(id);
        if (list) {
            return { message: "删除ok", data: {}, code: 200 };
        }
        else {
            return { message: "删除失败", data: {}, code: 500 };
        }
    }
    async findAllImg() {
        const files = glob.sync(`${fileRootPath}/upload/*`);
        const imageFiles = files.map((item) => {
            return `/api/upload${item.split("image")[1]}`;
        });
        return { imageFiles, code: 200 };
    }
    removeImage(directoryPath) {
        fsExtra.removeSync(`${fileRootPath}/upload/${directoryPath}`);
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __param(1, (0, typeorm_1.InjectRepository)(messageboard_entity_1.MessageBoard)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
