import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./filters/http-exception.filter";

import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { DiaryModule } from "./diary/diary.module";
import { ArticleModule } from "./article/article.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    UserModule,
    AuthModule,
    DiaryModule,
    ArticleModule,
    // LoggerModule,
    TypeOrmModule.forRoot({
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
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useValue: new HttpExceptionFilter(),
    },
    AppService,
  ],
})
export class AppModule {}
