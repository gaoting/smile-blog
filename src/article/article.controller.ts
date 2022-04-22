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
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";

@ApiTags("Article")
@Controller("api/article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("list")
  findAll(@Query() query): Promise<any> {
    return this.articleService.findAll(query);
  }

  @Get(":id")
  findById(@Query("id") id): Promise<any> {
    return this.articleService.findById(id);
  }

  @Get("searchList")
  searchList(@Query() query): Promise<any> {
    return this.articleService.searchNum(query);
  }

  @Post("add")
  create(@Body() body) {
    this.articleService.create(body);
  }

  @Put("update")
  updateOne(@Query("id") id, @Body() body): Promise<String> {
    return this.articleService.update(id, body);
  }

  @Delete("delete")
  delete(@Query("id") id): Promise<String> {
    return this.articleService.delete(id);
  }
}
