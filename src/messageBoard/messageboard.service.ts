import { UserService } from "./../user/user.service";
import { User } from "./../user/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { MessageBoard } from "./messageboard.entity";
import {
  Injectable,
  HttpException,
  HttpStatus,
  Controller,
} from "@nestjs/common";

@Injectable()
export class MessageBoardService {
  constructor(
    @InjectRepository(MessageBoard)
    private readonly repository: Repository<MessageBoard>,

    @InjectRepository(User)
    private readonly userService: Repository<User>
  ) {}

  // 查询所有 带分页
  async findAll(query?: any): Promise<any> {
    const qb = await this.repository.createQueryBuilder("messageBoard");
    qb.where("1=1");
    qb.orderBy("messageBoard.createTime", "DESC");

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

    return data;
  }

  async create(obj: any): Promise<any> {
    console.log(obj, "ooooooooodd");
    let diaryData = new MessageBoard();
    diaryData.avatar = obj.avatar;
    diaryData.userName = obj.userName;
    diaryData.content = obj.content;
    await this.repository.save(diaryData);
    return { code: 200, message: "创建ok" };
  }

  // 点赞
  async setLove(obj: any): Promise<any> {
    const { id, loveNum } = obj;
    await this.repository.update(id, { loveNum: Math.abs(loveNum) });
    return this.repository.findOne(id);
  }
}
