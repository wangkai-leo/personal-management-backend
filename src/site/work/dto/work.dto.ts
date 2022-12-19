import { IsString, IsInt } from 'class-validator';

export class WorkIdDto{
  @IsString()
  id:string;
}

export class RemoveEmployeeDto{
  @IsString()
  work_id:string;
  @IsString()
  employee_id:string;
}

export class SaveTeamDto{
  @IsString()
  work:string;
  @IsString()
  plannings:string;
}