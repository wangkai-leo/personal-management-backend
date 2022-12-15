import { WorkIdDto } from '../dto/work.dto';
import { EntityWork } from '../dto/work.entity';
export interface WorkInterface{
  createWork:(entityWork:EntityWork,user:any)=>any;
  getWorkById:(workIdDto:WorkIdDto)=>any;
  updateWork:(entityWork:EntityWork,user:any)=>any;
  getWorksList:()=>any;
}