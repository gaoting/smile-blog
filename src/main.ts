import { AppModule } from "./app.module";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { TransformInterceptor } from "./interceptor/transform.interceptor";
import { NestExpressApplication } from "@nestjs/platform-express";
import { AllExceptionsFilter } from "./filters/all-exceptions.filter";
import { NestFactory } from "@nestjs/core";
import { RedisModule } from "nestjs-redis";
import { Transport } from "@nestjs/microservices";
import { WsAdapter } from "@nestjs/platform-ws";
// import  {WsAdapter} from './../ws/ws.adapter'

import * as express from "express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: ["error", "warn", "debug"],
    cors: true,
  });
  // 处理跨域
  app.enableCors();

  // 设置 public 下的静态文件可访问  eg: http://localhost:3300/uploads/a3.jpg
  app.useStaticAssets("public");

  const rootDir = join(__dirname, "..");
  app.use("/public", express.static(join(rootDir, "public")));

  const options = new DocumentBuilder()
    .setTitle("Nodejs + Vue3.js 全栈项目-博客API")
    .setDescription("smile 博客api")
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("api", app, document);

  app.useWebSocketAdapter(new WsAdapter(app));

  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3300);
}
bootstrap();
