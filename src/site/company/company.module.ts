import { Module } from "@nestjs/common";
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { EntityCompany } from "./dto/company.entity";


@Module({
  imports: [TypeOrmModule.forFeature([EntityCompany])],
  controllers:[CompanyController],
  providers:[CompanyService],
  exports:[CompanyService]
})

export class CompanyModule{}