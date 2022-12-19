import { Body, Controller, Post, Session, ValidationPipe } from '@nestjs/common';
import { CompanyService } from './company.service';
import { EntityCompany } from './dto/company.entity';


@Controller('company')
export class CompanyController{
  constructor(private readonly companyService:CompanyService){
  }

  @Post('info')
  async getCompanyInfo(
    @Session() session:Record<string,any>
  ){
    return await this.companyService.getCompanyInfo(session.park_user);
  }
}