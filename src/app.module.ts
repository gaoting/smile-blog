import { MessageBoardModule } from "./messageBoard/messageboard.module";
import { MessageBoardService } from "./messageBoard/messageboard.service";
import { MessageBoardController } from "./messageBoard/messageboard.controller";
import { HttpExceptionFilter } from "./filters/http-exception.filter";
import { APP_FILTER } from "@nestjs/core";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DiaryModule } from "./diary/diary.module";
import { ArticleModule } from "./article/article.module";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TestModule } from "./test/test.module";
import { LoggerModule } from "nestjs-pino";
import { Module } from "@nestjs/common";
import { RedisModule } from "@liaoliaots/nestjs-redis";

@Module({
  imports: [
    MessageBoardModule,
    // UserModule,
    AuthModule,
    DiaryModule,
    ArticleModule,
    RedisModule.forRoot({
      closeClient: true,
      config: {
        namespace: "counter",
        host: "127.0.0.1",
        port: 6379,
        password: "12345678",
        db: 11,
      },
    }),
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
