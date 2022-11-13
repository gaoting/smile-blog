import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { User } from "./user.entity";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
var bcrypt = require("bcrypt");
import fetch from "node-fetch"

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    public readonly user: Repository<User>
  ) {}

  async registerUser(body): Promise<any> {
    try {
      const { userName, pwd } = body;

      const user = await this.user.findOne({ where: { userName } });

      if (!user) {
        const saltOrRounds = 10;
        const pwds = await bcrypt.hash(pwd, saltOrRounds);

        await this.user
          .createQueryBuilder()
          .insert()
          .into(User)
          .values([
            {
              userName: userName,
              pwd: pwds,
            },
          ])
          .execute();

        return {
          list: user,
          code: 200,
          message: "注册ok",
        };
      }
      return {
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "账号已被注册",
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: error };
    }
  }

  async login(body, clinetIp): Promise<any> {
    const { userName, pwd } = body;
    const findUser = await this.user.findOne({ where: { userName } });
    if (!findUser) {
      return {
        code: 401,
        message: "去注册",
      };
    }
    let userInfo = new User();
    const ip = clinetIp ? clinetIp.split("f:")[1] : "";
    if (ip) {
      const ipResult:any = await fetch(
        `https://restapi.amap.com/v3/ip?key=310d88b1f76599ee6a4b0bd50ba6bbd8&ip=${ip}`
      )
        .then((res) => res.json())
        .catch(() => {});

      userInfo.IP = ip;
      userInfo.city = ipResult.city;
      await this.user.update(userName, userInfo);
    }
    return {
      userInfo,
      userName: findUser.userName,
      code: 200,
      message: "login ok",
    };
  }
}
