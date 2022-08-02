import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository, DeleteResult } from "typeorm";
import { Diary } from "./diary.entity";
import {
  Injectable,
  HttpException,
  HttpStatus,
  Controller,
} from "@nestjs/common";
import { DiaryDto } from "./diary.dto";

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly repository: Repository<Diary>
  ) {}

  // 查询所有 带分页
  async findAll(query?: any): Promise<any> {
    const qb = await this.repository.createQueryBuilder("diary");
    qb.where("1=1");
    qb.orderBy("diary.createTime", "DESC");

    const total = await qb.getCount();
    const { current = 1, pageSize = 20 } = query;
    qb.limit(pageSize);

    qb.offset(pageSize * (current - 1));

    const posts = await qb.getMany();
    let data = {
      code: 200,
      list: posts,
      total: total,
      pageSize: pageSize,
      current: current,
    };
    console.log(data, "ddddddddddddd1111111");
    return data;
  }

  async create(obj: DiaryDto): Promise<any> {
    let diaryData = new Diary();
    try {
      diaryData.content = obj.content;
      const newArticle = await this.repository.save(diaryData);
      return { data: newArticle, message: "创建ok" };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  // 点赞
  async setLove(obj: any): Promise<any> {
    const { id, loveNum } = obj;
    await this.repository.update(id, { loveNum: Math.abs(loveNum) });
    return this.repository.findOne(id);
  }
}
