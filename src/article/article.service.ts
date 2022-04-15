import { Repository, getConnection } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { Injectable } from "@nestjs/common";
import { http } from "src/common/http";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleService: Repository<Article>
  ) {}

  async findAll(): Promise<any> {
    // const res = new http();
    // res.resultCode = 200;
    const list = await this.articleService.find();

    // for (let i = 0; i < list.length; i++) {
    //   const articles: any = list[i];
    //   const actionList = await getConnection()
    //     .createQueryBuilder(Article, 'article')
    //     .getOne();
    //   articles.restaurant = actionList;
    // }
    console.log(list, typeof list ,"+++++++++");

    return list;
  }

  async create(obj: any): Promise<any> {
    let info = await this.articleService.insert(obj);

    if (info) {
      return "更新ok";
    } else {
      return "更新失败";
    }
  }

  async update(id, cat): Promise<String> {
    let list = await this.articleService.update(id, cat);
    if (list) {
      return "更新ok";
    } else {
      return "更新失败";
    }
  }

  async delete(id): Promise<String> {
    let list = await this.articleService.delete(id);
    if (list) {
      return "删除ok";
    } else {
      return "删除失败";
    }
  }
}
