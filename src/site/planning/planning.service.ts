import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DataSource } from 'typeorm';
import { PlanningDateDto, PlanningIdDto, PlanningTaskIdDto } from './dto/planning.dto';
import { EntityPlanning } from "./dto/planning.entity";
import { PlanningInterface } from './interface/planning.interface';
import { EntityTask } from '../task/dto/task.entity';
import { EntityUser } from '../user/dto/user.entity';
import DateUtil from '../../leo.wang.core/common/operator.date';
import { Cron } from '@nestjs/schedule';


@Injectable()
export class PlanningService implements PlanningInterface {
  private dt = new DateUtil();
  constructor(
    @InjectRepository(EntityPlanning)
    private readonly planningRepository: Repository<EntityPlanning>,
    @InjectRepository(EntityTask)
    private readonly taskRepository: Repository<EntityTask>,
    @InjectRepository(EntityUser)
    private readonly dataSource: DataSource
  ) { }

  async deletePlanning(planningIdDto: PlanningIdDto, user: any) {
    try {
      const rst = await this.planningRepository.delete({
        id: planningIdDto.id,
        user: user.id
      });
      if (rst.affected > 0) {
        return rst;
      } else {
        throw new HttpException({ message: 'Planning not exist！' }, 400);
      }
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async updatePlanning(entityPlanning: EntityPlanning, user: any) {
    try {
      return await this.planningRepository.update({
        id: entityPlanning.id,
        user: user.id
      }, entityPlanning);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async getPlanningByTaskId(planningTaskIdDto: PlanningTaskIdDto, user: any) {
    try {
      return await this.planningRepository.createQueryBuilder('planning')
        .leftJoinAndSelect('planning.task', 'task')
        .where('task.id=:id', { id: planningTaskIdDto.task_id })
        .getMany();
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async addPlanning(entityPlanning: EntityPlanning, user: any) {
    try {
      const query_map = this.taskRepository.createQueryBuilder('task')
        .leftJoin('task.user','user')
        .where({ del_flag: 0 })
        .andWhere('task.user=:id',{id:user.id})
      if (entityPlanning.task) {
        query_map.andWhere({ id: entityPlanning.task })
        const task = await query_map.getCount()
        if (!task) {
          throw new HttpException('当前任务不存在', 400)
        }
        query_map.andWhere('parent_id=0')
        const task_count = await query_map.getCount()
        if (task_count > 0) {
          //the project task
          throw new HttpException('项目无法添加计划', 400)
        }

      } else {
        entityPlanning.task = null;
      }
      entityPlanning.create_time = new Date();
      entityPlanning.user = user;
      await this.planningRepository.save(entityPlanning);
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  async getUnfinishedPlanning(planningDateDto: PlanningDateDto, user: any) {
    try {
      const query = this.planningRepository.createQueryBuilder('planning')
        .leftJoin('planning.user', 'user')
        .leftJoinAndSelect('planning.task', 'task')
        .where('user.id=:id', { id: user.id })
        .andWhere({ del_flag: 0 })
        .orderBy('begin_time', 'ASC')
        .orderBy('end_time','ASC')
      if (planningDateDto.is_repeat !== '') {
        query.andWhere({ is_repeat: planningDateDto.is_repeat })
      }
      if (planningDateDto.date !== '') {
        const date = this.dt.makeDate({ date: planningDateDto.date });
        query.andWhere('planning.date=:date', { date: date })
      } else {
        query.andWhere({ is_complete: 0 })
      }
      const planning=await query.getMany();
      for(let i=0;i<planning.length;i++){
        if(planning[i].date){
          planning[i]['date_fm']=this.dt.makeString({date:planning[i].date});
        }
      }
      return planning;
    } catch (error) {
      throw new HttpException(error, 400);
    }
  };

  @Cron('1 1 1 * * *')
  async handleCron() {
    try {
      const repeat_task=await this.planningRepository.update({is_repeat:1},{is_complete:0});
      console.log(repeat_task);
    } catch (error) {
      console.log(error)
    }
  }
}