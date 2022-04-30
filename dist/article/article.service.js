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
let ArticleService = class ArticleService {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async findAll(query) {
        const qb = await this.articleService.createQueryBuilder("article");
        qb.where("1=1");
        qb.orderBy("article.createTime", "DESC");
        const total = await qb.getCount();
        const { current, pageSize } = query, params = __rest(query, ["current", "pageSize"]);
        qb.limit(pageSize);
        qb.andWhere(params);
        qb.offset(pageSize * (current - 1));
        const posts = await qb.getMany();
        let data = {
            list: posts,
            total: total,
            pageSize: pageSize,
            current: current,
        };
        return params.id ? posts[0] : data;
    }
    async findById(id) {
        const qb = this.articleService
            .createQueryBuilder("article")
            .where("article.id=:id")
            .setParameter("id", id);
        const result = await qb.getOne();
        if (!result)
            throw new common_1.HttpException(`id为${id}的文章不存在`, common_1.HttpStatus.BAD_REQUEST);
        await this.articleService.update(id, { lookNum: result.lookNum + 1 });
        return result;
    }
    async setLove(obj) {
        const { id, loveNum } = obj;
        await this.articleService.update(id, { loveNum: loveNum });
        let data = await this.articleService.findOne(id);
        return data;
    }
    async searchNum(query) {
        let qb = await this.articleService.createQueryBuilder("article");
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
                    qb.orderBy("article.updateTime", "DESC");
            }
        }
        qb.addOrderBy("article.updateTime", "DESC");
        qb.limit(10);
        const posts = await qb.getMany();
        console.log(posts, "==================33333");
        return {
            list: posts,
        };
    }
    async create(obj) {
        var _a;
        let article = new article_entity_1.Article();
        try {
            article.title = obj.title;
            article.tags = obj.tags;
            article.author = obj.author;
            article.types = obj.types;
            article.content = obj.content;
            article.activeKey = obj.activeKey;
            article.description = obj.description
                ? obj.description
                : (_a = obj.content) === null || _a === void 0 ? void 0 : _a.substring(0, 300);
            const newArticle = await this.articleService.save(article);
            return { data: newArticle, message: "创建ok" };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
            return { message: error };
        }
    }
    async updated(obj) {
        const { id } = obj, params = __rest(obj, ["id"]);
        const qb = this.articleService
            .createQueryBuilder("article")
            .where("article.id=:id")
            .setParameter("id", id);
        const result = await qb.getOne();
        if (!result)
            throw new common_1.HttpException(`id为${id}的文章不存在`, common_1.HttpStatus.BAD_REQUEST);
        await this.articleService.update(id, params);
        return result;
    }
    async delete(id) {
        let list = await this.articleService.delete(id);
        if (list) {
            return "删除ok";
        }
        else {
            return "删除失败";
        }
    }
    async findAllImg() {
        const files = glob.sync(`${fileRootPath}/upload/*`);
        const imageFiles = files.map((item) => {
            return `/api/upload${item.split("image")[1]}`;
        });
        return imageFiles;
    }
    removeImage(directoryPath) {
        fsExtra.removeSync(`${fileRootPath}/upload/${directoryPath}`);
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
