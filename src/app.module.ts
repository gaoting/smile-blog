
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
  providers: [ AppService],
})
export class AppModule {}
