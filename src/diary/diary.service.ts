import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getRepository, DeleteResult } from "typeorm";
import { Diary } from "./diary.entity";
import { Injectable, HttpException, HttpStatus,Controller } from "@nestjs/common";
import { DiaryDto } from "./diary.dto";


@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diary:Repository<Diary>
  ){}

// 查询所有 带分页

}
