import { AuthModule } from "./../auth/auth.module";
import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article as ArticleEntity } from "./article.entity";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { MessageBoard } from "./../messageBoard/messageboard.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageBoard]),
    TypeOrmModule.forFeature([ArticleEntity]),
    AuthModule,
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
