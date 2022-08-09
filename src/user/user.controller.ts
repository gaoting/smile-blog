import { AuthService } from "../auth/auth.service";
import { UserService } from "./user.service";
import { Body, Controller, Post, Header } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

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
    console.log(body, "bbbbbbb-----");
    return this.userService.registerUser(body);
  }

  @Post("/login")
  @Header("content-type", "application/json")
  public async login(@Body() body: any) {
    const { userName, pwd } = body;

    const result = await this.authService.validateUser(userName, pwd);

    if (result) {
      return {
        code: 200,
        message: "登录ok",
        userName,
        token: this.authService.certificate({ userName, pwd }), // 签发token
      };
    }

    // return {
    //   code: 201,
    //   message: "用户名或密码错误",
    // };
  }
}
