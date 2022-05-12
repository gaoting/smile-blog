import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
} from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { DiaryService } from "./diary.service";

@ApiTags("日志")
@Controller("api/diary")
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get("list")
  findAll(@Query() query): Promise<any> {
    return this.diaryService.findAll(query);
  }

  @Post("add")
  create(@Body() body) {
    this.diaryService.create(body);
  }

  // 更新点赞量
  @Put("updateNum")
  updateNum(@Body() body): Promise<String> {
    console.log(body, "qqqqqqqqqqqqqqq");
    return this.diaryService.setLove(body);
  }
}
