import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { EntityFinance } from './dto/finance.entity';


@Controller('finance')
export class FinanceController{
  constructor(private readonly financeService:FinanceService){

  }
  @Post('add')
  async addFinance(
    @Body(ValidationPipe) entityFinance:EntityFinance,
    @Session() session:Record<string,any>
  ){
    return await this.financeService.addFinance(entityFinance,session.park_user)
  }
}