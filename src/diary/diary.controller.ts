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
import { DiaryService } from "./diary.service";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";

@ApiTags("日志")
@Controller("api/diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get("list")
  findAll(@Query() query): Promise<any> {
    return this.diaryService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add")
  @ApiBearerAuth("JWT")
  @Header("content-type", "application/json")
  create(@Body() body) {
    this.diaryService.create(body);
  }

  // 更新点赞量
  @Put("updateNum")
  updateNum(@Body() body): Promise<String> {
    return this.diaryService.setLove(body);
  }
}
