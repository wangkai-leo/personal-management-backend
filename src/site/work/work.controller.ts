import { Body, Controller, Post, Res, Session, ValidationPipe } from "@nestjs/common";
import { WorkService } from './work.service';
import { WorkIdDto } from './dto/work.dto';
import { EntityWork } from './dto/work.entity';

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
}