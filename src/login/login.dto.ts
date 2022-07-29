
import { IsString } from "class-validator";

export class CreateDto {
  userName: string;
  pwd: string;
  IP?: string;
  // id: string;
  avatar?: string;
  // createTime:string;
  // updateTime: string;
}