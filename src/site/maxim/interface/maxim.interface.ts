import { IdDto } from '../dto/maxim.dto';
import { EntityMaxim } from '../dto/maxim.entity';
export interface MaximInterface{
  addMaxim:(entityMaxim:EntityMaxim)=>void;
  deleteMaxim:(idDto:IdDto)=>void;
  getTodayMaxim:()=>void;
}