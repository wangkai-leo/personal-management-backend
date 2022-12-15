import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { EntityMaxim } from './dto/maxim.entity';
import { Repository } from 'typeorm';
import { MaximInterface } from './interface/maxim.interface';
import { IdDto } from "./dto/maxim.dto";

@Injectable()
export class MaxinService implements MaximInterface{
  constructor(
    @InjectRepository(EntityMaxim)
    private readonly maximRepository: Repository<EntityMaxim>
  ){

  }

  deleteMaxim(idDto: IdDto){

  };

  addMaxim(entityMaxim: EntityMaxim){

  };

  async getTodayMaxim(){
    try {
      return await this.maximRepository.createQueryBuilder('maxim')
      .where({del_flag:0})
      .getOne()
    } catch (error) {
      throw new HttpException(error,400)
    }
  };
}
