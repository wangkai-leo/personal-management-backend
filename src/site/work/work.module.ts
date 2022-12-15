import { Module } from "@nestjs/common";
import { WorkService } from './work.service';
import { WorkController } from './work.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityWork } from './dto/work.entity';

@Module({
  imports:[TypeOrmModule.forFeature([EntityWork])],
  controllers:[WorkController],
  providers:[WorkService],
  exports:[WorkService]
})

export class WorkModule{}