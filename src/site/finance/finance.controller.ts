import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { EntityFinance } from './dto/finance.entity';
import { FinanceFilterDto, UpdateFinanceDto, WorkIdDto } from './dto/finance.dto';


@Controller('finance')
export class FinanceController{
  constructor(private readonly financeService:FinanceService){

  }

  @Post('filter')
  async filterFiance(
    @Body(ValidationPipe) financeFilterDto:FinanceFilterDto,
    @Session() session:Record<string,any>
  ){
    return await this.financeService.getFianceList(financeFilterDto,session.park_user)
  }

  @Post('info')
  async getFianceInfo(
    @Body(ValidationPipe) WorkIdDto:WorkIdDto,
    @Session() session:Record<string,any>
  ){
    return await this.financeService.getFianceByWorkId(WorkIdDto,session.park_user)
  }

  @Post('update')
  async updateFiance(
    @Body(ValidationPipe) updateFinanceDto:UpdateFinanceDto,
    @Session() session:Record<string,any>
  ){
    return await this.financeService.updateFinance(updateFinanceDto,session.park_user)
  }
}