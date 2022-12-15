import { Module } from "@nestjs/common";
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityPlanning } from './dto/planning.entity';
import { EntityTask } from "../task/dto/task.entity";
import { EntityUser } from '../user/dto/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EntityPlanning,EntityTask,EntityUser])],
  controllers:[PlanningController],
  providers:[PlanningService],
  exports:[PlanningService]
})

export class PlanningModule{}