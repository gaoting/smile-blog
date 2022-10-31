import { IsString } from "class-validator";

export class CreateDto {
  title: string;
  author: string;
  types: number;
  description: string;
  content: string;
  tags: number;
  lookNum:number;
  loveNum:number;
  id:number;
  picture: string;
}
