"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const core_1 = require("@nestjs/core");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const user_module_1 = require("./user/user.module");
const auth_module_1 = require("./auth/auth.module");
const diary_module_1 = require("./diary/diary.module");
const article_module_1 = require("./article/article.module");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const typeorm_1 = require("@nestjs/typeorm");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            diary_module_1.DiaryModule,
            article_module_1.ArticleModule,
            typeorm_1.TypeOrmModule.forRoot({
                type: "mysql",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "12345678",
                database: "smile_blog",
                entities: [__dirname, "./**/*.entity.{js,ts"],
                autoLoadEntities: true,
                synchronize: true,
                logging: "all",
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useValue: new http_exception_filter_1.HttpExceptionFilter(),
            },
            app_service_1.AppService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
