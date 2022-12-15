import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { ScopeDtoId } from './dto/scope.dto';
import { DimScope } from './dto/scope.entity';
import { ScopeInterface } from './interface/scope.interface';

@Injectable()
export class ScopeService implements ScopeInterface{
  constructor(
    @InjectRepository(DimScope)
    private userRepository: Repository<DimScope>,
    private dataSource: DataSource,
  ){}

  async getScopeById(scopeDtoId: ScopeDtoId){
    try {
      return await this.userRepository.createQueryBuilder('scope')
      .where(scopeDtoId)
      .andWhere({del_flag:0})
      .getOne()
    } catch (error) {
      throw new HttpException(error,400)
    }
  };
  async getScopeList(){
    try {
      return await this.userRepository.findBy({
        del_flag:0
      })
    } catch (error) {
      throw new HttpException(error,400)
    }
  };

  async addScope(dimScope: DimScope){
    try {
      dimScope.create_time=new Date();
      return await this.userRepository.save(dimScope);
    } catch (error) {
      throw new HttpException(error,400)
    }
  };
}; 