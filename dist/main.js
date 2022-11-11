"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_module_1 = require("./app.module");
const swagger_1 = require("@nestjs/swagger");
const transform_interceptor_1 = require("./interceptor/transform.interceptor");
const all_exceptions_filter_1 = require("./filters/all-exceptions.filter");
const core_1 = require("@nestjs/core");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        bufferLogs: true,
        logger: ["error", "warn", "debug"],
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
    app.useGlobalFilters(new all_exceptions_filter_1.AllExceptionsFilter());
    app.useGlobalInterceptors(new transform_interceptor_1.TransformInterceptor());
    await app.listen(3300);
}
bootstrap();
