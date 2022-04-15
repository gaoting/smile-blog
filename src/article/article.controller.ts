import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Res,
  HttpStatus,
  ExecutionContext,
  NestInterceptor,
  UseGuards,
} from "@nestjs/common";
// import { Roles } from '../common/roles.decorator';
import { ApiTags } from "@nestjs/swagger";
import { ArticleService } from "./article.service";

@ApiTags("Article")
@Controller("article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("list")
  findAll() {
    return this.articleService.findAll();
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
  delete(@Query("id") id, @Body() body): Promise<String> {
    return this.articleService.delete(id);
  }
}
