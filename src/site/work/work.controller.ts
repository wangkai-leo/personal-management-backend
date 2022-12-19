import { Body, Controller, Post, Res, Session, ValidationPipe } from "@nestjs/common";
import { WorkService } from './work.service';
import { RemoveEmployeeDto, SaveTeamDto, WorkIdDto } from './dto/work.dto';
import { EntityWork } from './dto/work.entity';
import { EntityWorkPlanning } from "./dto/work.planning.entity";

@Controller('work')
export class WorkController{
  constructor(private workService:WorkService){}

  @Post('add')
  async addWork(
    @Body(ValidationPipe) entityWork:EntityWork,
    @Session() session: Record<string, any>
  ){
    return await this.workService.createWork(entityWork,session.park_user);
  }

  @Post('list')
  async getWorkList(){
    return await this.workService.getWorksList();
  }

  @Post('update')
  async updateWork(
    @Body(ValidationPipe) entityWork:EntityWork,
    @Session() session: Record<string, any>
  ){
    return await this.workService.updateWork(entityWork,session.park_user);
  }

  @Post('info')
  async getWorkInfo(
    @Body(ValidationPipe) workIdDto:WorkIdDto,
  ){
    return await this.workService.getWorkById(workIdDto);
  }

  @Post('planning')
  async getWorkPlanning(
    @Body(ValidationPipe) workIdDto:WorkIdDto,
  ){
    return await this.workService.getWorkPlanning(workIdDto);
  }

  @Post('removeemployee')
  async removeEmployeeFormWork(
    @Body(ValidationPipe) removeEmployeeDto:RemoveEmployeeDto,
  ){
    return await this.workService.removeEmployeeFormWork(removeEmployeeDto);
  }

  @Post('saveteam')
  async addEmployeeToWork(
    @Body(ValidationPipe) saveTeamDto:SaveTeamDto,
    @Session() session: Record<string, any>
  ){
    return await this.workService.saveWorkTeam(saveTeamDto,session.park_user);
  }
}