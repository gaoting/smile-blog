/*
 * @Author: gaoting_fanhan 837082729@qq.com
 * @Date: 2022-07-30 22:52:23
 * @LastEditors: gaoting_fanhan 837082729@qq.com
 * @LastEditTime: 2022-08-19 10:00:02
 * @FilePath: /smile-blog-vue3/Users/smile/Coding/smile-blog/src/user/user.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
        message: "注册失败",
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      return { message: error };
    }
  }
}
