import { PlanningDateDto, PlanningIdDto, PlanningTaskIdDto } from "../dto/planning.dto";
import { EntityPlanning } from "../dto/planning.entity";

export interface PlanningInterface{
  addPlanning:(entityPlanning:EntityPlanning,user:any)=>void;
  getUnfinishedPlanning:(planningDateDto:PlanningDateDto,user:any)=>void;
  updatePlanning:(entityPlanning:EntityPlanning,user:any)=>void;
  deletePlanning:(planningIdDto:PlanningIdDto,user:any)=>void;
  getPlanningByTaskId:(planningTaskIdDto:PlanningTaskIdDto,user:any)=>void;
}