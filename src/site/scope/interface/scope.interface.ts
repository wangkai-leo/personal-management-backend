import { ScopeDtoId } from "../dto/scope.dto";
import { DimScope } from "../dto/scope.entity";

export interface ScopeInterface{
  addScope:(dimScope:DimScope)=>void;
  getScopeList:()=>void;
  getScopeById:(scopeDtoId:ScopeDtoId)=>void;
}