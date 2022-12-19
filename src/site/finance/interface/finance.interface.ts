import { FinanceFilterDto, UpdateFinanceDto, WorkIdDto } from "../dto/finance.dto";
import { EntityFinance } from "../dto/finance.entity";

export interface FinanceInterface{
  updateFinance:(updateFinanceDto:UpdateFinanceDto,user:any)=>void;
  getFianceList:(financeFilterDto:FinanceFilterDto,user:any)=>void;
  getFianceByWorkId:(workIdDto:WorkIdDto,user:any)=>void;
}