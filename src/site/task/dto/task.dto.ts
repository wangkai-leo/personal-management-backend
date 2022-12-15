import { IsDate, IsInt, IsString } from 'class-validator';
export class TaskIdDto{
  @IsString()
  id:number
}
export class ParentTaskIdDto{
  @IsString()
  parent_id:number
}

export class TaskDateDto{
  @IsString()
  date:string
}


export class TaskFilterDto{
  model:string;
  is_complete:string;
  date:string;
  is_parent:string
}

export class TreeTaskFilterDto{
  is_complete:string;
  scope:string;
  parent_id:string;
}