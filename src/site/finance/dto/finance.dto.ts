import { IsString } from 'class-validator';


export class FinanceFilterDto{
  del_flag:string
}


export class WorkIdDto{
  work_id:string
}

export class UpdateFinanceDto{
  @IsString()
  id:string;
  domain_cost:number;
  other_cost:number;
  quotation:number;
}