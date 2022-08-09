"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("./common/transform.interceptor");
const http_exception_filter_1 = require("./filters/http-exception.filter");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
    });
    app.enableCors();
    app.useStaticAssets("images");
    const options = new swagger_1.DocumentBuilder()
        .setTitle("Nodejs + Vue3.js 全栈项目-博客API")
        .setDescription("smile 博客api")
        .setVersion("1.0")
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup("api", app, document);
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    app.useGlobalFilters(new http_exception_filter_1.HttpExceptionFilter());
    await app.listen(3300);
}
bootstrap();
