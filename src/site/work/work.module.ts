import { Module } from "@nestjs/common";
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityWork } from './dto/work.entity';
import { EntityWorkPlanning } from './dto/work.planning.entity';
import { FinanceModule } from '../finance/finance.module';

@Module({
  imports:[TypeOrmModule.forFeature([EntityWork,EntityWorkPlanning]),FinanceModule],
  controllers:[WorkController],
  providers:[WorkService],
  exports:[WorkService]
})

export class WorkModule{}