import { callback } from "./jwt.strategy";
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginService } from "./login.service";
import { CreateDto } from "./login.dto";
import { AuthGuard } from "@nestjs/passport";

export const jwtConstants = {
  secret: 'secretKey'
}

@ApiTags("注册")
@Controller("")
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post("register")
  register(@Query() createDto: CreateDto) {
    return this.loginService.create(createDto);
  }

  @Get("checklogin")
  @UseGuards(AuthGuard('jwt'))
  public checkLogin() {
    return "valid user:" + this.loginService.getUser().userName;
  }

  @Post('login')
  // @UseGuards(AuthGuard('local'))
  login(@Query() query) {
    return this.loginService.login(query.userName, query.pwd)
  }
}
