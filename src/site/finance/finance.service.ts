import { FinanceInterface } from './interface/finance.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { EntityFinance } from './dto/finance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class FinanceService implements FinanceInterface{
  constructor(
    @InjectRepository(EntityFinance)
    private readonly financeRepository:Repository<EntityFinance>
  ){

  }
  async addFinance(entityFinance:EntityFinance,user:any){
    try {
      return await this.financeRepository.save(entityFinance)
    } catch (error) {
      throw new HttpException(error,400)
    }
  };

  async updateFinance(entityFinance:EntityFinance,user:any){
    try {
      return await this.financeRepository.update({
        id:entityFinance.id
      },{
        quotation:entityFinance.quotation
      })
    } catch (error) {
      throw new HttpException(error,400)
    }
  }
}