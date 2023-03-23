import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Header,
  UploadedFiles,
} from "@nestjs/common";
import { UploadService } from "./upload.service";
import {
  FileInterceptor,
  AnyFilesInterceptor,
  FilesInterceptor,
} from "@nestjs/platform-express";

import { CreateUploadDto } from "./dto/create-upload.dto";
import { UpdateUploadDto } from "./dto/update-upload.dto";

import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { Express } from "express";
import { diskStorage } from "multer";
import * as path from "path";
import { v4 as uuidv4 } from "uuid";
import { createWriteStream } from "fs";
import { join } from "path";

@ApiTags("upload")
@Controller("api")
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post("upload")
  @ApiOperation({ summary: "上传图片" })
  @UseInterceptors(FilesInterceptor("file"))
  upload(@UploadedFiles() files) {
    return this.uploadService.create(files[0]);
  }
}
