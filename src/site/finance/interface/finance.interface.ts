import { EntityFinance } from "../dto/finance.entity";

export interface FinanceInterface{
  addFinance:(entityFinance:EntityFinance,user:any)=>void;
  updateFinance:(entityFinance:EntityFinance,user:any)=>void;
}