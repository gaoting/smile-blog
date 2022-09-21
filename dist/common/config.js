"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_entity_1 = require("./../article/article.entity");
const diary_entity_1 = require("./../diary/diary.entity");
const entitiesList = [article_entity_1.Article, diary_entity_1.Diary];
const productConfig = {
    type: "mysql",
    host: "localhost",
    port: 3300,
    username: "root",
    password: "12345678",
    database: "smile_blog",
    entities: entitiesList,
    autoLoadEntities: true,
    synchronize: true,
    logging: "all",
};
const devConfig = {
    type: "mysql",
    host: "localhost",
    port: 3300,
    username: "root",
    password: "12345678",
    database: "smile_blog",
    entities: entitiesList,
    autoLoadEntities: true,
    synchronize: true,
    logging: "all",
};
const config = process.env.NODE_ENV ? productConfig : devConfig;
exports.default = config;
