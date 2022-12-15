import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { EntityPlanning } from './dto/planning.entity';
import { PlanningDateDto, PlanningIdDto } from './dto/planning.dto';


@Controller('planning')
export class PlanningController{
  constructor(
    private planningService:PlanningService
  ){

  }

  @Post('add')
  async addPlanning(
    @Body(ValidationPipe) entityPlanning:EntityPlanning,
    @Session() session:Record<string, any>
  ){
    return await this.planningService.addPlanning(entityPlanning,session.park_user)
  }

  @Post('list')
  async getPlanning(
    @Body(ValidationPipe) planningDateDto:PlanningDateDto,
    @Session() session:Record<string, any>
  ){
    return await this.planningService.getUnfinishedPlanning(planningDateDto,session.park_user)
  }

  @Post('update')
  async updatePlanning(
    @Body(ValidationPipe) entityPlanning:EntityPlanning,
    @Session() session:Record<string, any>
  ){
    return await this.planningService.updatePlanning(entityPlanning,session.park_user)
  }

  @Post('delete')
  async deletePlanning(
    @Body(ValidationPipe) planningIdDto:PlanningIdDto,
    @Session() session:Record<string, any>
  ){
    return await this.planningService.deletePlanning(planningIdDto,session.park_user)
  }
}