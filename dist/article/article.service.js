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
let ArticleService = class ArticleService {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async findAll(query) {
        const qb = await this.articleService.createQueryBuilder("article");
        qb.where("1=1");
        qb.orderBy("article.updateTime", "DESC");
        const total = await qb.getCount();
        const { current = 1, pageSize = 10 } = query, params = __rest(query, ["current", "pageSize"]);
        qb.limit(pageSize);
        qb.andWhere(params);
        qb.offset(pageSize * (current - 1));
        const posts = await qb.getMany();
        let data = {
            list: posts,
            total: posts.length,
            pageSize: pageSize,
            current: current,
        };
        return params.id ? posts[0] : data;
    }
    async findById(id) {
        let a = await this.articleService.findOne(id);
        let b = await this.articleService.find({ where: { id: id }, skip: 1 });
        console.log(b, "dddddddddddddddd");
        return a;
    }
    async searchNum(query) {
        console.log(query, "---------3333444");
        const qb = await this.articleService.createQueryBuilder("article");
        qb.orderBy("article.lookNum", "DESC");
        qb.where(query);
        const posts = await qb.getMany();
        console.log(posts, "==================33333");
        return {
            list: posts,
        };
    }
    async create(obj) {
        let info = await this.articleService.insert(obj);
        if (info) {
            return "更新ok";
        }
        else {
            return "更新失败";
        }
    }
    async update(id, cat) {
        let list = await this.articleService.update(id, cat);
        if (list) {
            return "更新ok";
        }
        else {
            return "更新失败";
        }
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
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
