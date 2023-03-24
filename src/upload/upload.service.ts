import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateUploadDto } from "./dto/create-upload.dto";
import { UpdateUploadDto } from "./dto/update-upload.dto";
import { Upload } from "./entities/upload.entity";
import { Repository } from "typeorm";
import * as dayjs from "dayjs";

@Injectable()
export class UploadService {
  constructor(
    @InjectRepository(Upload)
    private readonly uploadService: Repository<Upload>
  ) {}

  async create(file: any) {
    console.log("[ file------- ] >", file);
    let entity = new Upload();
    entity.fileName = file.originalname;
    entity.url = file.originalname;
    entity.date = dayjs(file.date).format("YYYY-MM-DD HH:mm:ss");
    await this.uploadService.save(entity);
    return { result: entity, code: 200, message: "add ok" };
  }

  findAll() {
    return `This action returns all upload`;
  }

  findOne(id: number) {
    return `This action returns a #${id} upload`;
  }

  update(id: number, updateUploadDto: UpdateUploadDto) {
    return `This action updates a #${id} upload`;
  }

  remove(id: number) {
    return `This action removes a #${id} upload`;
  }
}
