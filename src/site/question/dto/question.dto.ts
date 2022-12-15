import { IsString, IsInt } from 'class-validator';
import { DimScope } from '../../scope/dto/scope.entity';

export class IdDto{
  @IsString()
  id:number;
}


export class TaskIdDto{
  @IsString()
  task_id:number;
}

export class CreateQustionDto{
  @IsString()
  title:string;
  correct_answer:string;
  for_exam:number
  del_flag: number;

  @IsString()
  task_id:number;
  
  @IsString()
  scope:DimScope
}

export class FilterQuestionDto{
  sovle_status:number //1未解决 //2解决
}


export class RandomCount{
  count:number //1未解决 //2解决
}