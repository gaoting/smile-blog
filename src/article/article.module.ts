import { AuthModule } from './../auth/auth.module';
import { Module } from "@nestjs/common";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./article.service";
import { Article as ArticleEntity } from "./article.entity";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]),AuthModule],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
