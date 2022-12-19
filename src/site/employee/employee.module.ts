import { Module } from "@nestjs/common";
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityEmployee } from "./dto/employee.entity";
import { EntityCompany } from "../company/dto/company.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EntityEmployee,EntityCompany])],
  controllers:[EmployeeController],
  providers:[EmployeeService],
  exports:[EmployeeService]
})

export class EmployeeModule{}