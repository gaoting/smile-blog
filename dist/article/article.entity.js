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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const typeorm_1 = require("typeorm");
let Article = class Article {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, default: "", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: null, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "tags", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: null, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "types", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "lookNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: 0, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "loveNum", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 60, default: "", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "picture", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: null, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "preId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", default: null, nullable: true }),
    __metadata("design:type", Number)
], Article.prototype, "nextId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 60, default: "", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "preTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 60, default: "", nullable: true }),
    __metadata("design:type", String)
], Article.prototype, "nextTitle", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", String)
], Article.prototype, "createTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        type: "timestamp",
        nullable: true,
    }),
    __metadata("design:type", String)
], Article.prototype, "updateTime", void 0);
Article = __decorate([
    (0, typeorm_1.Entity)()
], Article);
exports.Article = Article;
