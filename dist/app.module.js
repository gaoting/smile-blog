"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const diary_module_1 = require("./diary/diary.module");
const diary_service_1 = require("./diary/diary.service");
const diary_controller_1 = require("./diary/diary.controller");
const article_module_1 = require("./article/article.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
const article_entity_1 = require("./article/article.entity");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            diary_module_1.DiaryModule,
            article_module_1.ArticleModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "12345678",
                database: "smile_blog",
                entities: [article_entity_1.Article],
                autoLoadEntities: true,
                synchronize: true,
                logging: "all",
            }),
        ],
        controllers: [diary_controller_1.DiaryController, app_controller_1.AppController],
        providers: [diary_service_1.DiaryService, app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
