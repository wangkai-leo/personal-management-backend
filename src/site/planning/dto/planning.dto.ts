import { IsDateString, IsString } from "class-validator";
import { EntityUser } from '../../user/dto/user.entity';

export class PlanningDateDto {
  date:string;
  is_repeat:string
  // user:EntityUser;
}

export class PlanningTaskIdDto{
  @IsString()
  task_id:number
}

export class PlanningIdDto{
  @IsString()
  id:number
}