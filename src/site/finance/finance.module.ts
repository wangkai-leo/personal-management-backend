import { Module } from "@nestjs/common";
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityFinance } from "./dto/finance.entity";


@Module({
  imports: [TypeOrmModule.forFeature([EntityFinance])],
  controllers:[FinanceController],
  providers:[FinanceService],
  exports:[FinanceService]
})

export class FinanceModule{}