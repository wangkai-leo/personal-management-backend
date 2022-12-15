import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MaxinService } from './maxim.service';

@Controller('maxim')
export class MaximController{
  constructor(
    private readonly maxinService:MaxinService
  ){

  }
  @Post('today')
  async getTodayMaxim(

  ){
    return await this.maxinService.getTodayMaxim()
  }

  @Post('add')
  addMaxim(){
    
  }

  @Post('delete')
  deleteMaxim(){
    
  }
}