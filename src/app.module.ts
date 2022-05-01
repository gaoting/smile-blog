import { ArticleModule } from "./article/article.module";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
// import config from "./common/config"
import { Article } from "./article/article.entity";

@Module({
  imports: [
    ArticleModule,
    TypeOrmModule.forRoot( {
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "12345678",
      database: "smile_blog",
      entities: [Article],
      autoLoadEntities: true,
      synchronize: true,
      logging: "all",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
