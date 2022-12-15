import { IsString, IsInt } from 'class-validator';

export class WorkIdDto{
  @IsString()
  id:string;
}