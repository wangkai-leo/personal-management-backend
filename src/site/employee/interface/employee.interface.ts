import { EmployeeFilterDto } from "../dto/employee.dto";
import { EntityEmployee } from "../dto/employee.entity";

export interface EmployeeInterface{
  getEmployeeList:(employeeFilterDto:EmployeeFilterDto,user: any)=>void;
  addEmployee:(entityEmployee:EntityEmployee,user:any)=>void;
  updateEmployee:(entityEmployee:EntityEmployee,user:any)=>void;
}