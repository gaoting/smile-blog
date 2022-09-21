import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DiaryModule } from "./diary/diary.module";
import { ArticleModule } from "./article/article.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import { Log4jsModule } from "./lib/log4js/log4js.module";
// import { LOG4JS_PROVIDER } from "./lib/log4js/log4js.constants";
import { TestModule } from './test/test.module';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DiaryModule,
    ArticleModule,
    // LoggerModule.forRoot({ pinoHttp: { level: process.env.LOG_LEVEL } }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: "mysql",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "12345678",
        database: "smile_blog",
        // entities: [Article, Diary, Login],
        entities: [__dirname, "./**/*.entity.{js,ts"],

        autoLoadEntities: true,
        synchronize: true,
        logging: "all",
        timezone: "+08:00",
      }),
    }),
    TestModule,
    // Log4jsModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      // useValue: new HttpExceptionFilter(),
      useClass: HttpExceptionFilter,
    },
    AppService,
  ],
})
export class AppModule {}
