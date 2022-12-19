import { FinanceInterface } from './interface/finance.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { EntityFinance } from './dto/finance.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FinanceFilterDto, WorkIdDto, UpdateFinanceDto } from './dto/finance.dto';

@Injectable()
export class FinanceService implements FinanceInterface {
  private profit: number = 0.5;
  private month_work_day: number = 21;

  constructor(
    @InjectRepository(EntityFinance)
    private readonly financeRepository: Repository<EntityFinance>
  ) {

  }

  async getFianceByWorkId(workIdDto: WorkIdDto, user: any) {
    try {
      return await this.financeRepository.createQueryBuilder('finance')
        .where('finance.work=:work', { work: workIdDto.work_id })
        .andWhere('finance.user=:user', { user: user.id })
        .getOne();
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };


  async getFianceList(financeFilterDto: FinanceFilterDto, user: any) {
    try {
      return await this.financeRepository.createQueryBuilder('finance')
        .leftJoinAndSelect('finance.work','work')
        .leftJoin('finance.user', 'user')
        .where('user.id=:id', { id: user.id })
        .andWhere(financeFilterDto)
        .getMany()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async updateFinance(updateFinanceDto: any, user: any) {
    try {
      return await this.financeRepository.update({
        id:updateFinanceDto.id
      },updateFinanceDto)
    } catch (error) {
      throw new HttpException(error, 400)
    }
  }

  async updateManPowerCost(workIdDto: any, user: any, workplaning: any) {
    try {
      let finance = await this.financeRepository.createQueryBuilder('finance')
        .leftJoinAndSelect('finance.work', 'work')
        .where('finance.work=:work', { work: workIdDto.work_id })
        .andWhere('finance.user=:user', { user: user.id })
        .getOne();
      if (!finance) {
        const ef = new EntityFinance();
        ef.create_time = new Date();
        ef.work = workIdDto.work_id;
        ef.user = user.id;
        finance = await this.financeRepository.save(ef)
      }
      let manpower_cost = 0;
      for (let i = 0; i < workplaning.length; i++) {
        let item = workplaning[i];
        manpower_cost += Math.ceil(item.employee_salary / this.month_work_day * item.cost_date)
      }
      await this.financeRepository.update({
        id: finance.id
      }, {
        manpower_cost: manpower_cost
      })
    } catch (error) {
      throw new HttpException(error, 400)
    }

  }
}