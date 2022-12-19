import { Injectable, HttpException } from '@nestjs/common';
import { RemoveEmployeeDto, SaveTeamDto, WorkIdDto } from "./dto/work.dto";
import { WorkInterface } from './interface/work.interface';
import { DataSource, Repository } from 'typeorm';
import { EntityWork } from "./dto/work.entity";
import { InjectRepository } from '@nestjs/typeorm';
import { EntityWorkPlanning } from './dto/work.planning.entity';
import {EntityEmployee} from '../employee/dto/employee.entity';
import { FinanceService } from '../finance/finance.service';
@Injectable()
export class WorkService implements WorkInterface {
  constructor(
    @InjectRepository(EntityWork)
    private workRepository: Repository<EntityWork>,
    @InjectRepository(EntityWorkPlanning)
    private workPlanningRepository: Repository<EntityWorkPlanning>,
    private financeService:FinanceService,
    private dataSource: DataSource
  ) { }

  async saveWorkTeam(saveTeamDto:SaveTeamDto,user:any) {
    try {

      //update teams work planning scheme
      const entityWorkPlannings=JSON.parse(saveTeamDto.plannings);
      for(let i=0;i<entityWorkPlannings.length;i++){
        let entityWorkPlanning=entityWorkPlannings[i];
        if(entityWorkPlanning.id){
          await this.workPlanningRepository.update({id:entityWorkPlanning.id},{
            cost_date:entityWorkPlanning.cost_date
          })
        }else{
          entityWorkPlanning.work=saveTeamDto.work;
          entityWorkPlanning.employee_id=entityWorkPlanning.employee_id;
          entityWorkPlanning.create_time=new Date();
          await this.workPlanningRepository.save(entityWorkPlanning);
        }
      }
      //fetch current work planning scheme 
      const workplaning=await this.getWorkPlanning({id:saveTeamDto.work});
      //update manpower cost infomation
      await this.financeService.updateManPowerCost({work_id:saveTeamDto.work},user, workplaning);
      return 'success';
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };


  async removeEmployeeFormWork(removeEmployeeDto: RemoveEmployeeDto) {
    try {
      const employee = await this.workPlanningRepository.createQueryBuilder('workplanning')
        .where('workplanning.work=:work', { work: removeEmployeeDto.work_id })
        .andWhere('workplanning.employee_id=:employee_id', { employee_id: removeEmployeeDto.employee_id })
        .getOne();
      return await this.workPlanningRepository.remove(employee);
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async getWorkPlanning(workIdDto: WorkIdDto) {
    try {
      return await this.workPlanningRepository.createQueryBuilder('workplanning')
        .leftJoinAndSelect(EntityEmployee, 'employee','employee.id=workplanning.employee_id')
        .select(`
          workplanning.id as id,
          employee.id as employee_id,
          employee.name as employee_name,
          employee.salary as employee_salary,
          workplanning.cost_date as cost_date
        `)
        .where('workplanning.work=:work', { work: workIdDto.id })
        .getRawMany();
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };


  async createWork(entityWork: EntityWork, user: any) {
    try {
      entityWork.create_time = new Date();
      entityWork.user = user.id;
      return await this.workRepository.save(entityWork)
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };
  async getWorkById(workIdDto: WorkIdDto) {
    try {
      return await this.workRepository.createQueryBuilder('work')
        .where('work.id=:id', { id: workIdDto.id })
        .getOne();
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async updateWork(entityWork: EntityWork, user: any) {
    try {
      return await this.workRepository.update({ id: entityWork.id, user: user.id }, entityWork);
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async getWorksList() {
    try {
      return await this.workRepository.createQueryBuilder('work')
        .where('work.del_flag=0')
        .getMany()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };
}
