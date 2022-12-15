import { HttpException, Injectable } from '@nestjs/common';
import { EntityTask } from './dto/task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { TaskInterface } from './interface/task.interface';
import { ParentTaskIdDto, TaskDateDto, TaskFilterDto, TaskIdDto, TreeTaskFilterDto } from './dto/task.dto';
import { ScopeService } from '../scope/scope.service';
import DateUtil from '../../leo.wang.core/common/operator.date';
import { EntityPlanning } from '../planning/dto/planning.entity';
@Injectable()
export class TaskService implements TaskInterface {
  private dt = new DateUtil();
  constructor(
    @InjectRepository(EntityTask)
    private usersRepository: Repository<EntityTask>,
    @InjectRepository(EntityPlanning)
    private planningRepository: Repository<EntityPlanning>,
    private readonly scopeService: ScopeService,
  ) { }

  async getTaskList(taskFilterDto: TaskFilterDto, user: any) {
    try {
      const query_map = this.usersRepository.createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .leftJoinAndSelect('task.questions', 'questions')
        .leftJoinAndSelect('task.scope', 'scope')
        .where('user.id=:id', { id: user.id })
        .orderBy('scope.id', 'ASC')
      if (taskFilterDto.is_complete !== undefined) {
        query_map.andWhere('is_complete=:is_complete', { is_complete: taskFilterDto.is_complete })
      }
      if (taskFilterDto.date !== undefined) {
        const date = this.dt.makeDate({ date: taskFilterDto.date });
        query_map
          .andWhere('begin_date<=:date', { date: date })
          .andWhere('end_date>=:date', { date: date })
      }
      if (taskFilterDto.is_parent !== undefined) {
        query_map.andWhere('parent_id=0')
      } else {
        query_map.andWhere('parent_id!=0')
      }
      let tasks = await query_map.getMany()
      tasks = this.formatTask(tasks);
      return tasks;
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async completeTask(taskIdDto: TaskIdDto, user: any) {
    try {
      const rst = await this.usersRepository.createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .where(taskIdDto)
        .andWhere('user.id=:id', { id: user.id })
        .andWhere({ del_flag: 0 })
        .andWhere({ is_complete: 0 })
        .getOne();
      if (rst) {
        rst.is_complete = 1;
        rst.complete_date = new Date();
        const plannings = await this.planningRepository.createQueryBuilder('planning')
        .where({task:rst.id})
        .andWhere({is_complete:0})
        .getMany();
        for(let i=0;i<plannings.length;i++){
          plannings[i].is_complete=1;
          plannings[i].complete_time=new Date();
        }
        await this.planningRepository.save(plannings);
        await this.usersRepository.save(rst);
      } else {
        throw new HttpException({ message: '你没有未该任务' }, 400)
      }
      return rst;
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };


  async deleteTaskById(taskIdDto: TaskIdDto, user: any) {
    try {
      const tk = await this.getTaskInfoById(taskIdDto, user);
      const su_tk = await this.usersRepository.createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .andWhere('user.id=:id', { id: user.id })
        .where({ parent_id: tk.id })
        .getCount();
      if (su_tk != 0) {
        throw new HttpException({ message: '子任务的任务不能删除' }, 400)
      }
      return await this.usersRepository.remove(tk);
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async addTask(entityTask: any, user: any) {
    try {
      if (entityTask.parent_id) {
        const et = await this.getTaskInfoById({ id: entityTask.parent_id }, user)
        if (!et) {
          throw new HttpException({ message: '父亲类任务不存在' }, 400)
        }
      }
      const es = await this.scopeService.getScopeById({ id: entityTask.scope });
      if (!es) {
        throw new HttpException({ message: '所属任务类型不存在' }, 400)
      }
      entityTask.scope = es;
      entityTask.create_time = new Date();
      return await this.usersRepository.save(entityTask);
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async updateTask(entityTask: EntityTask, user: any) {
    try {
      const rst = await this.usersRepository.update({ id: entityTask.id }, entityTask);
      if (rst.affected != 0) {
        return rst
      } else {
        throw new HttpException('该任务不存在', 400)
      }
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async getTreeTasks(treeTaskFilterDto: TreeTaskFilterDto, user: any) {
    try {
      const query_map = this.usersRepository.createQueryBuilder('task')
        .leftJoinAndSelect('task.scope', 'scope')
        .leftJoinAndSelect('task.questions', 'questions')
        .leftJoinAndSelect('task.plannings', 'plannings')
        .where({ user: user })
        .orderBy('task.scope', 'ASC')
        .andWhere('task.parent_id=:parent_id', { parent_id: treeTaskFilterDto.parent_id })

      console.log('----')
      console.log(treeTaskFilterDto.is_complete)
      console.log(treeTaskFilterDto.parent_id)
      if (treeTaskFilterDto.is_complete !== undefined) {
        query_map.andWhere('task.is_complete=:is_complete', { is_complete: treeTaskFilterDto.is_complete })
      }
      if (treeTaskFilterDto.scope !== undefined) {
        query_map.andWhere('scope.id=:id', { id: treeTaskFilterDto.scope })
      }
      let tasks = await query_map.getMany();
      if (tasks.length > 0) {
        tasks = this.formatTask(tasks);
        for (let i = 0; i < tasks.length; i++) {
          tasks[i] = this.formatTask(tasks[i])
          const item = tasks[i];
          treeTaskFilterDto.parent_id = item.id.toString();
          console.log(treeTaskFilterDto)
          const children = await this.getTreeTasks(treeTaskFilterDto, user);
          item['children'] = children;
        }
      }
      return tasks;
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async getTaskInfoById(taskIdDto: TaskIdDto, user: any) {
    try {
      return await this.usersRepository.createQueryBuilder('task')
        .leftJoin('task.user', 'user')
        .leftJoinAndSelect('task.scope', 'scope')
        .where(taskIdDto)
        .andWhere('user.id=:id', { id: user.id })
        .andWhere({ del_flag: 0 })
        .getOne()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };


  private formatTask(tasks) {
    for (let i = 0; i < tasks.length; i++) {
      const task = tasks[i];
      if (task.begin_date) {
        task['begin_date_fm'] = this.dt.makeString({ date: task.begin_date });
      }
      if (task.end_date) {
        task['end_date_fm'] = this.dt.makeString({ date: task.end_date });
      }
    }
    return tasks;
  }
}
