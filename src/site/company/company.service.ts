import { CompanyInterface } from './interface/company.interface';
import { HttpException, Injectable } from "@nestjs/common";
import { EntityCompany } from './dto/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class CompanyService implements CompanyInterface{
  constructor(
    @InjectRepository(EntityCompany)
    private readonly CompanyRepository:Repository<EntityCompany>
  ){

  }
  async getCompanyInfo(user: any){
    try {
      return await this.CompanyRepository.createQueryBuilder('company')
      .leftJoin('company.user','user')
      .where('company.user=:user',{user:user.id})
      .getOne()
    } catch (error) {
      throw new HttpException(error,400)
    }
  };
}