import { Injectable, HttpException } from '@nestjs/common';
import { WorkIdDto } from "./dto/work.dto";
import { WorkInterface } from './interface/work.interface';
import { DataSource, Repository } from 'typeorm';
import { EntityWork } from "./dto/work.entity";
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WorkService implements WorkInterface {
  constructor(
    @InjectRepository(EntityWork)
    private workRepository: Repository<EntityWork>,
    private dataSource: DataSource
  ) { }
  async createWork(entityWork: EntityWork, user: any) {
    try {
      entityWork.create_time = new Date();
      entityWork.user=user.id;
      return await this.workRepository.save(entityWork)
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };
  async getWorkById(workIdDto: WorkIdDto) {
    try {
      return await this.workRepository.createQueryBuilder('work')
        .where('work.id=:id', { id: workIdDto.id })
        .getOne();
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };
  
  async updateWork(entityWork: EntityWork, user: any) {
    try {
      return await this.workRepository.update({ id: entityWork.id, user: user.id }, entityWork);
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };

  async getWorksList() {
    try {
      return await this.workRepository.createQueryBuilder('work')
      .where('work.del_flag=0')
      .getMany()
    } catch (error) {
      throw new HttpException(error, 400)
    }
  };
}