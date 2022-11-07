import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Body,
  Param,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  Header,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { ArticleService } from "./article.service";
import {
  FileFieldsInterceptor,
  FileInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";
// 3.将上传的图片放到某个文件夹
import { createWriteStream } from "fs";
import { join } from "path";
import { AuthGuard } from "@nestjs/passport";
import { RolesGuard, Roles } from "./../auth/role.guard";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

const multer = require("multer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const fileRootPath = "./images";

@ApiTags("文章")
@Controller("api/article")
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get("list")
  findAll(@Query() query): Promise<any> {
    return this.articleService.findAll(query);
  }

  @Get("content")
  findById(@Query("id") id): Promise<any> {
    return this.articleService.findById(id);
  }

  @Post("searchList")
  // @Header("content-type", "application/json")
  searchList(@Body() body): Promise<any> {
    console.log(body,'000002222');
    return this.articleService.searchNum(body);
  }

  @UseGuards(JwtAuthGuard)
  @Post("add")
  @ApiBearerAuth("JWT")
  @Header("content-type", "application/json")
  // @Roles('admin','root')
  create(@Body() body) {
    return this.articleService.add(body);
  }

  // 更新文章
  @Put("update")
  updateOne(@Body() body): Promise<String> {
    return this.articleService.updated(body);
  }

  // 更新收藏量
  @Put("updateNum")
  updateNum(@Body() body): Promise<String> {
    return this.articleService.setLove(body);
  }

  @Delete("delete")
  delete(@Query("id") id): Promise<String> {
    return this.articleService.delete(id);
  }

  @Get("getImgList")
  findAllImg() {
    return this.articleService.findAllImg();
  }

  @Post("upload")

  // 当我们要上传单个文件时, 我们只需将 FileInterceptor() 与处理程序绑定在一起
  // 然后使用 @UploadedFile() 装饰器从 request 中取出 file。
  @UseInterceptors(
    FileInterceptor("file", {
      storage: multer.diskStorage({
        destination: async (req, file, cb) => {
          const path = `${fileRootPath}/upload`;
          // ensureDir 确保目录的存在。如果目录结构不存在,就创建一个
          await fsExtra.ensureDir(path);
          if (!fs.existsSync(path)) {
            fs.mkdirSync(path);
          }
          cb(null, path);
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    })
  )
  @ApiOperation({ summary: "上传图片" })
  uploadPic(@UploadedFile() file) {
    console.log(file);
    return {
      file,
    };
  }

  @ApiOperation({ summary: "删除图片" })
  @Delete("delete/:path")
  async remove(@Param("path") path: string) {
    return await this.articleService.removeImage(path);
  }
}
