import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  Header,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { MessageBoardService } from "./messageboard.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
// import fetch from "node-fetch"
import fetch from "node-fetch"
import { IpAddress } from "../decorators/info.decorator";

@ApiTags("留言板")
@Controller("api/messageboard")
export class MessageBoardController {
  constructor(private readonly messageBoardService: MessageBoardService) {}

  @Get("list")
  findAll(@Query() query): Promise<any> {
    return this.messageBoardService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add")
  @ApiBearerAuth("JWT")
  @Header("content-type", "application/json")
  create(@Body() body, @IpAddress() clinetIp: string) {
    this.messageBoardService.create(body, clinetIp);
  }

  // 更新点赞量
  @Put("updateNum")
  updateNum(@Body() body): Promise<String> {
    return this.messageBoardService.setLove(body);
  }
}
