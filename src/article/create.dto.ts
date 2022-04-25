import { IsString } from "class-validator";

export class CreateDto {
  title: string;
  author: string;
  types: string;
  description: string;
  content: string;
  tags: string;
  lookNum:number;
  loveNum:number;
  id:number;
}
