import { RemoveEmployeeDto, SaveTeamDto, WorkIdDto } from '../dto/work.dto';
import { EntityWork } from '../dto/work.entity';
import { EntityWorkPlanning } from '../dto/work.planning.entity';
export interface WorkInterface{
  createWork:(entityWork:EntityWork,user:any)=>any;
  getWorkById:(workIdDto:WorkIdDto)=>any;
  updateWork:(entityWork:EntityWork,user:any)=>any;
  getWorksList:()=>any;

  getWorkPlanning:(workIdDto:WorkIdDto)=>any;
  removeEmployeeFormWork:(removeEmployeeDto:RemoveEmployeeDto)=>any;
  saveWorkTeam:(saveTeamDto:SaveTeamDto,user:any)=>any;
  
}