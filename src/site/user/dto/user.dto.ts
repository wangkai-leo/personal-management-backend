import { IsString, IsInt } from 'class-validator';

export class UserLoginDto {
  @IsString()
  name: string;
  @IsString()
  password: string;
}

export class UserIdDto{
  @IsInt()
  id:number
}