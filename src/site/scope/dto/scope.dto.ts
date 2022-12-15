import { IsInt } from "class-validator";

export class ScopeDtoId{
  @IsInt()
  id:number
}