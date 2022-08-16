import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeleteResult } from "typeorm";
import { User } from "./user.entity";
import { Injectable, HttpStatus, HttpException } from "@nestjs/common";
var bcrypt = require("bcrypt");


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly user: Repository<User>
    
  ) {}

  async registerUser(info: { userName: string; pwd: string }): Promise<any> {
    try {
      const { userName, pwd } = info;

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
        message: "注册失败",
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: error };
    }
  }
}
