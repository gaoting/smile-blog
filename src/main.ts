// import { LOG4JS_PROVIDER } from "./lib/log4js/log4js.constants";
import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { NestFactory } from "@nestjs/core";
// import { Logger } from "nestjs-pino";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
  });
  // 处理跨域
  app.enableCors();

  app.useStaticAssets("images");

  const options = new DocumentBuilder()
    .setTitle("Nodejs + Vue3.js 全栈项目-博客API")
    .setDescription("smile 博客api")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup("api", app, document);

  // 全局注册错误的过滤器
  // const logger = app.get(Logger);
  // app.useLogger(app.get(Logger));

  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  await app.listen(3300);
}
bootstrap();
