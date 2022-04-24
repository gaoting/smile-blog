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
    const qb = await this.articleService.createQueryBuilder("article");
    qb.where("1=1");
    qb.orderBy("article.updateTime", "DESC");

    const total = await qb.getCount();
    const { current = 1, pageSize = 10, ...params } = query;
    qb.limit(pageSize);
    qb.andWhere(params);
    qb.offset(pageSize * (current - 1));

    const posts = await qb.getMany();

    let data = {
      list: posts,
      total: posts.length,
      pageSize: pageSize,
      current: current,
    };
    return params.id ? posts[0] : data;
  }

  // 获取指定id
  async findById(id: number): Promise<any> {
    let a = await this.articleService.findOne(id);
    let b = await this.articleService.find({ where: { id: id }, skip: 1 });
    console.log(b, "dddddddddddddddd");

    return a;
  }

  // 根据条件查询列表  不带分页
  async searchNum(query?: any): Promise<any> {
    console.log(query, "---------3333444");
    const qb = await this.articleService.createQueryBuilder("article");
    // qb.where("1=1");
    qb.orderBy("article.lookNum", "DESC");
    qb.where(query);

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
