/*
 * @Author: gaoting_fanhan 837082729@qq.com
 * @Date: 2022-07-30 23:15:39
 * @LastEditors: gaoting_fanhan 837082729@qq.com
 * @LastEditTime: 2022-08-18 15:42:57
 * @FilePath: /smile-blog-vue3/Users/smile/Coding/smile-blog/src/user/user.module.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { User } from "./user.entity";
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "src/auth/auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [UserService, AuthService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
