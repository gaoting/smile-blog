/*
 * @Author: gaoting_fanhan 837082729@qq.com
 * @Date: 2022-07-30 22:51:35
 * @LastEditors: gaoting_fanhan 837082729@qq.com
 * @LastEditTime: 2022-08-23 16:38:03
 * @FilePath: /smile-blog-vue3/Users/smile/Coding/smile-blog/src/user/user.controller.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";
import { Body, Controller, Post, Header, UseGuards } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("用户")
@Controller("api/user")
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  @Post("/register")
  @Header("content-type", "application/json")
  public register(@Body() body) {
    return this.userService.registerUser(body);
  }

  @Post("/login")
  @Header("content-type", "application/json")
  @UseGuards(AuthGuard("local"))
  public async login(@Body() body: any) {
    const { userName, pwd } = body;

    const result = await this.authService.validateUser(userName, pwd);
console.log(result, 'rerrrrrr')
    if (result) {
      return {
        code: 200,
        message: "登录ok",
        userName,
        token: this.authService.certificate({ userName, pwd}), // 签发token
      };
    }

    // return {
    //   code: 201,
    //   message: "用户名或密码错误",
    // };
  }
}
