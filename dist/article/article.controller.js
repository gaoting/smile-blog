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
exports.ArticleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const article_service_1 = require("./article.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const fileRootPath = "./images";
let ArticleController = class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }
    findAll(query) {
        return this.articleService.findAll(query);
    }
    findById(id) {
        return this.articleService.findById(id);
    }
    searchList(query) {
        return this.articleService.searchNum(query);
    }
    create(body) {
        this.articleService.create(body);
    }
    updateOne(body) {
        return this.articleService.updated(body);
    }
    updateNum(body) {
        console.log(body, "qqqqqqqqqqqqqqq");
        return this.articleService.setLove(body);
    }
    delete(id) {
        return this.articleService.delete(id);
    }
    findAllImg() {
        return this.articleService.findAllImg();
    }
    uploadPic(file) {
        console.log(file);
        return {
            file,
        };
    }
    async remove(path) {
        return await this.articleService.removeImage(path);
    }
};
__decorate([
    (0, common_1.Get)("list"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)("content"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "findById", null);
__decorate([
    (0, common_1.Get)("searchList"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "searchList", null);
__decorate([
    (0, common_1.Post)("add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("update"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateOne", null);
__decorate([
    (0, common_1.Put)("updateNum"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "updateNum", null);
__decorate([
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Query)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)("getImgList"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "findAllImg", null);
__decorate([
    (0, common_1.Post)("upload"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: multer.diskStorage({
            destination: async (req, file, cb) => {
                const path = `${fileRootPath}/upload`;
                await fsExtra.ensureDir(path);
                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }
                cb(null, path);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            },
        }),
    })),
    (0, swagger_1.ApiOperation)({ summary: "上传图片" }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ArticleController.prototype, "uploadPic", null);
__decorate([
    (0, swagger_1.ApiOperation)({ summary: "删除图片" }),
    (0, common_1.Delete)("delete/:path"),
    __param(0, (0, common_1.Param)("path")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArticleController.prototype, "remove", null);
ArticleController = __decorate([
    (0, swagger_1.ApiTags)("文章"),
    (0, common_1.Controller)("api/article"),
    __metadata("design:paramtypes", [article_service_1.ArticleService])
], ArticleController);
exports.ArticleController = ArticleController;
