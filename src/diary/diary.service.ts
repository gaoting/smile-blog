
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
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
      total: +total,
      pageSize: +pageSize,
      current: +current,
    };

    return data;
  }

  async create(obj: DiaryDto): Promise<any> {
    console.log(obj, "ooooooooodd");
    let diaryData = new Diary();

    diaryData.content = obj.content;
    await this.repository.save(diaryData);
    return { code: 200, message: "创建ok" };
  }

  // 点赞
  async setLove(obj: any): Promise<any> {
    console.log(obj, "----------ooo");
    const { id, loveNum } = obj;
    await this.repository.update(id, { loveNum: Math.abs(loveNum) });
    const result = await this.repository.findOne({ where: { id } });
    return { list: result, code: 200, message: "更新ok" };
  }
}
