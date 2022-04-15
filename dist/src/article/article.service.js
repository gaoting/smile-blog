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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleService = void 0;
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const article_entity_1 = require("./article.entity");
const common_1 = require("@nestjs/common");
const http_1 = require("../common/http");
let ArticleService = class ArticleService {
    constructor(articleService) {
        this.articleService = articleService;
    }
    async findAll() {
        const res = new http_1.http();
        res.resultCode = 200;
        const list = await this.articleService.find();
        console.log(list);
        res.data = {
            list: list,
        };
        return res;
    }
    async create(obj) {
        const res = new http_1.http();
        let info = await this.articleService.insert(obj);
        res.code = 200;
        res.data = [];
        if (info) {
            res.message = '新增ok';
        }
        else {
            res.message = '新增失败';
        }
        return res;
    }
    async update(id, cat) {
        let list = await this.articleService.update(id, cat);
        if (list) {
            return '更新ok';
        }
        else {
            return '更新失败';
        }
    }
    async delete(id) {
        let list = await this.articleService.delete(id);
        if (list) {
            return '删除ok';
        }
        else {
            return '删除失败';
        }
    }
};
ArticleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(article_entity_1.Article)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ArticleService);
exports.ArticleService = ArticleService;
//# sourceMappingURL=article.service.js.map