import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EntityEmployee } from './dto/employee.entity';
import { EmployeeFilterDto } from './dto/employee.dto';


@Controller('employee')
export class EmployeeController{
  constructor(private readonly employeeService:EmployeeService){

  }


  @Post('add')
  async addFinance(
    @Body(ValidationPipe) entityEmployee:EntityEmployee,
    @Session() session:Record<string,any>
  ){
    return await this.employeeService.addEmployee(entityEmployee,session.park_user);
  }

  @Post('filter')
  async filterFiance(
    @Body(ValidationPipe) employeeFilterDto:EmployeeFilterDto,
    @Session() session:Record<string,any>
  ){
    return await this.employeeService.getEmployeeList(employeeFilterDto,session.park_user);
  }


  @Post('update')
  async updateFiance(
    @Body(ValidationPipe) EntityEmployee:EntityEmployee,
    @Session() session:Record<string,any>
  ){
    return await this.employeeService.updateEmployee(EntityEmployee,session.park_user);
  }
}