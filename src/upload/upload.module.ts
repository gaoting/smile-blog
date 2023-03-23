import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname, join } from "path";
import { Upload } from "./entities/upload.entity";
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import dayjs = require('dayjs');
import * as uuid from 'uuid';

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: `public/uploads/${dayjs().format('YYYY-MM-DD')}`,
        filename: (req, file, cb) => {
          // 在此处自定义保存后的文件名称
          // console.log('[ req, file, cb ] >', file, cb)
          const filename = file.originalname;
          return cb(null, filename);
        },
      }),
    }),
    TypeOrmModule.forFeature([Upload]),
  ],
  controllers: [UploadController],
  providers: [UploadService],
})
export class UploadModule {}
