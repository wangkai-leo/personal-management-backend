import {
  Body,
  Controller, Post
} from '@nestjs/common';
import { TaskService } from './task.service';
import { EntityTask } from './dto/task.entity';
import { ValidationPipe, Session } from '@nestjs/common';
import { TaskDateDto, TaskFilterDto, TaskIdDto, TreeTaskFilterDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService
  ) {
  }
  
  @Post('info')
  async getTaskInfo(
    @Body(ValidationPipe) taskIdDto:TaskIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.taskService.getTaskInfoById(taskIdDto,session.park_user);
  }

  @Post('add')
  async addTask(
    @Body(ValidationPipe) entityTask:EntityTask,
    @Session() session:Record<string, any>
  ){
    entityTask.user=session.park_user;
    return await this.taskService.addTask(entityTask,session.park_user);
  }

  @Post('complete')
  async completeTask(
    @Body(ValidationPipe) taskIdDto:TaskIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.taskService.completeTask(taskIdDto,session.park_user);
  }

  @Post('list')
  async getUnifinishedTasks(
    @Body(ValidationPipe) taskFilterDto:TaskFilterDto,
    @Session() session:Record<string, any>
  ){
    return await this.taskService.getTaskList(taskFilterDto,session.park_user);
  }

  @Post('tree')
  async getTreeTasks(
    @Body(ValidationPipe) treeTaskFilterDto:TreeTaskFilterDto,
    @Session() session:Record<string, any>
  ){
    treeTaskFilterDto.parent_id='0';
    return await this.taskService.getTreeTasks(treeTaskFilterDto,session.park_user);
  }

  @Post('update')
  async updateTaskInfo(
    @Body(ValidationPipe) entityTask: EntityTask,
    @Session() session:Record<string, any>
  ){
    return await this.taskService.updateTask(entityTask,session.park_user);
  }

  @Post('delete')
  async deleteTask(
    @Body(ValidationPipe) taskIdDto: TaskIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.taskService.deleteTaskById(taskIdDto,session.park_user);
  }
}
