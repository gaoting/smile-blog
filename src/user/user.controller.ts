import { UserService } from "./user.service";
import { Body, Controller, Post, Header, UseGuards, Get } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { IpAddress } from "../decorators/info.decorator";
const fetch = require("node-fetch");
import { AuthService } from "../auth/auth.service";
import { User } from "./user.entity";

@ApiTags("用户")
@Controller("api/user")
export class UserController {
  public constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) {}

  // 获取ip和定位
  @Get("/getClientIp")
  async getClientIp(@IpAddress() clinetIp: string) {
    const ip = clinetIp ? clinetIp.split("f:")[1] : "";
    const ipResult = await fetch(
      `https://restapi.amap.com/v3/ip?key=310d88b1f76599ee6a4b0bd50ba6bbd8&ip=${ip}`
    )
      .then((res) => res.json())
      .catch(() => {});
    return { code: 200, ipResult };
  }

  @Post("/register")
  @Header("content-type", "application/json")
  public register(@Body() body) {
    return this.userService.registerUser(body);
  }

  @Post("/login")
  @Header("content-type", "application/json")
  @UseGuards(AuthGuard("local"))
  public async login(@Body() body: any, @IpAddress() clinetIp: string) {
    const userInfo = await this.userService.login(body, clinetIp);

    const { userName, pwd } = body;
    const result = await this.authService.validateUser(userName, pwd);

    if (result) {
      return {
        code: 200,
        message: "登录ok",
        userInfo: userInfo.userInfo,
        userName:  userInfo.userName,
        token: this.authService.certificate({ userName, pwd }), // 签发token
      };
    } else {
      return {
        code: 201,
        message: "用户名或密码错误",
      };
    }
  }
}
