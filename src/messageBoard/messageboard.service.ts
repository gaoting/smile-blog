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
const fetch = require("node-fetch");

@Injectable()
export class MessageBoardService {
  constructor(
    @InjectRepository(MessageBoard)
    private readonly repository: Repository<MessageBoard>
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

    return {
      code: 200,
      list: posts,
      total: +total,
      pageSize: +pageSize,
      current: +current,
    };
  }

  async create(obj: any, clinetIp: any): Promise<any> {
    let diaryData = new MessageBoard();
    diaryData.avatar = obj.avatar;
    diaryData.userName = obj.userName;
    diaryData.content = obj.content;
    const ip = clinetIp ? clinetIp.split("f:")[1] : "";
    /**
     * fetch里接收到的res是一个Stream对象（数据流），res.json()是个异步操作，取出所有内容并转为json对象
     * res包含的数据通过Stream接口异步读取，对http回应的标头信息(Headers)可立即读取
     */
    if (ip) {
      let url = `https://restapi.amap.com/v3/ip?key=310d88b1f76599ee6a4b0bd50ba6bbd8&ip=${ip}`;
      try {
        let res = await fetch(url);
        let ipResult = await res.json();
        diaryData.IP = ip;
        diaryData.city = ipResult.city;
      } catch (err) {
        console.log(err);
      }
    }
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
