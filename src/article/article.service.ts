import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository, DeleteResult } from "typeorm";
import { Article } from "./article.entity";
import { Injectable } from "@nestjs/common";
import { http } from "src/common/http";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleService: Repository<Article>
  ) {}

  // 查询全部列表 带分页
  async findAll(query?: any): Promise<any> {
    console.log(query, "---------222222");

    const qb = await this.articleService.createQueryBuilder("article");
    qb.where("1=1");
    qb.orderBy("article.updateTime", "DESC");

    const total = await qb.getCount();
    const { current = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.andWhere(params);
    qb.offset(pageSize * (current - 1));

    const posts = await qb.getMany();
    console.log(posts, "=======================");

    return {
      list: posts,
      total: posts.length,
      pageSize: pageSize,
      current: current,
    };
  }

  // 获取指定id
  async findById(id: number): Promise<any> {
    console.log(id, "----------111");
    const qb = await this.articleService.createQueryBuilder("article").limit(1);
    qb.where("1=1");
    qb.andWhere({ id: id });
    const posts = await qb.getMany();
    console.log(posts, "00000000000000000000");
    return { list: posts };
  }

  // 根据条件查询列表  不带分页
  async searchNum(query?: any): Promise<any> {
    console.log(query, "---------3333");

    const qb = await this.articleService.createQueryBuilder("article");
    qb.where("1=1");
    qb.orderBy("article.lookNum", "DESC");

    qb.andWhere(query);

    const posts = await qb.getMany();
    console.log(posts, "==================33333");

    return {
      list: posts,
    };
  }

  // 创建
  async create(obj: any): Promise<any> {
    let info = await this.articleService.insert(obj);

    if (info) {
      return "更新ok";
    } else {
      return "更新失败";
    }
  }

  // 更新
  async update(id, cat): Promise<String> {
    let list = await this.articleService.update(id, cat);
    if (list) {
      return "更新ok";
    } else {
      return "更新失败";
    }
  }

  // 删除
  async delete(id): Promise<String> {
    let list = await this.articleService.delete(id);
    if (list) {
      return "删除ok";
    } else {
      return "删除失败";
    }
  }
}
