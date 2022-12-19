import { EmployeeInterface } from './interface/employee.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { EntityEmployee } from './dto/employee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeFilterDto } from './dto/employee.dto';
import { EntityCompany } from '../company/dto/company.entity';


@Injectable()
export class EmployeeService implements EmployeeInterface{
  constructor(
    @InjectRepository(EntityEmployee)
    private readonly employeeRepository:Repository<EntityEmployee>,
    @InjectRepository(EntityCompany)
    private readonly companyRepository:Repository<EntityCompany>
  ){

  }
  async updateEmployee(entityEmployee: EntityEmployee, user: any){
    try {
      return await this.employeeRepository.update({id:entityEmployee.id},entityEmployee)
    } catch (error) {
      throw new HttpException(error,400)
    }
  };

  async getEmployeeList(employeeFilterDto:EmployeeFilterDto,user: any){
    try {
      return await this.employeeRepository.createQueryBuilder('employee')
      .leftJoin('employee.company','company')
      .where('company.user=:user',{user:user.id})
      .andWhere(employeeFilterDto)
      .getMany()
    } catch (error) {
      throw new HttpException(error,400)
    }
  };

  async addEmployee(entityEmployee:EntityEmployee,user:any){
    try {
      const company=await this.companyRepository.createQueryBuilder('company')
      .where('company.user=:user',{user:user.id})
      .getOne();
      if(!company){
        throw new HttpException('该用户没有公司',400)
      }
      entityEmployee.company=company;
      entityEmployee.create_time=new Date();
      return await this.employeeRepository.save(entityEmployee)
    } catch (error) {
      throw new HttpException(error,400)
    }
  };
}