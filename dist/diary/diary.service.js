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
exports.DiaryService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const diary_entity_1 = require("./diary.entity");
const common_1 = require("@nestjs/common");
let DiaryService = class DiaryService {
    constructor(repository) {
        this.repository = repository;
    }
    async findAll(query) {
        const qb = await this.repository.createQueryBuilder("diary");
        qb.where("1=1");
        qb.orderBy("diary.createTime", "DESC");
        const total = await qb.getCount();
        const { current = 1, pageSize = 20 } = query;
        qb.limit(pageSize);
        qb.offset(pageSize * (current - 1));
        const posts = await qb.getMany();
        let data = {
            code: 200,
            list: posts,
            total: total,
            pageSize: pageSize,
            current: current,
        };
        return data;
    }
    async create(obj) {
        console.log(obj, 'ooooooooodd');
        let diaryData = new diary_entity_1.Diary();
        diaryData.content = obj.content;
        await this.repository.save(diaryData);
        return { code: 200, message: "创建ok" };
    }
    async setLove(obj) {
        const { id, loveNum } = obj;
        await this.repository.update(id, { loveNum: Math.abs(loveNum) });
        return this.repository.findOne(id);
    }
};
DiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(diary_entity_1.Diary)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], DiaryService);
exports.DiaryService = DiaryService;
