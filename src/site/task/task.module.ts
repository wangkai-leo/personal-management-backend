import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityTask } from './dto/task.entity';
import { QuestionModule } from '../question/question.module';
import { ScopeModule } from '../scope/scope.module';
import { PlanningModule } from '../planning/planning.module';
import { EntityPlanning } from '../planning/dto/planning.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EntityTask,EntityPlanning]),ScopeModule],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [TaskService],
})
export class TaskModule {}
