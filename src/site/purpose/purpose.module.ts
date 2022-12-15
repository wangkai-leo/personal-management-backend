import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { PurposeService } from "./purpose.service";
import { EntityPurpose } from './dto/purpose.entity';


@Module({
  imports:[TypeOrmModule.forFeature([EntityPurpose])],
  providers:[PurposeService],
  exports:[PurposeService]
})

export class PurposeModule{}