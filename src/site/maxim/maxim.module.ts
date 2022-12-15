import { Module } from "@nestjs/common";
import { MaxinService } from './maxim.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntityMaxim } from './dto/maxim.entity';
import { MaximController } from './maxim.controller';


@Module({
  imports:[TypeOrmModule.forFeature([EntityMaxim])],
  controllers:[MaximController],
  providers:[MaxinService],
  exports:[MaxinService]
})

export class MaximModule{

}