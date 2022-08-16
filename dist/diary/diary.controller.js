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
exports.DiaryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const diary_service_1 = require("./diary.service");
let DiaryController = class DiaryController {
    constructor(diaryService) {
        this.diaryService = diaryService;
    }
    findAll(query) {
        return this.diaryService.findAll(query);
    }
    create(body) {
        this.diaryService.create(body);
    }
    updateNum(body) {
        console.log(body, "qqqqqqqqqqqqqqq");
        return this.diaryService.setLove(body);
    }
};
__decorate([
    (0, common_1.Get)("list"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)("add"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DiaryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)("updateNum"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DiaryController.prototype, "updateNum", null);
DiaryController = __decorate([
    (0, swagger_1.ApiTags)("日志"),
    (0, common_1.Controller)("api/diary"),
    __metadata("design:paramtypes", [diary_service_1.DiaryService])
], DiaryController);
exports.DiaryController = DiaryController;
