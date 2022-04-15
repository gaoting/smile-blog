import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './common/filters'
import { TransformInterceptor } from './common/transform.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 处理跨域
  app.enableCors();
  
  const options = new DocumentBuilder()
    .setTitle('Nodejs + Vue3.js 全栈项目-博客API')
    .setDescription('smile 博客api')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api', app, document);

   // 全局注册错误的过滤器
   await app.useGlobalInterceptors(new TransformInterceptor());
   await app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3006);
}
bootstrap();
