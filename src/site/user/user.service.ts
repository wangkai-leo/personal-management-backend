import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { EntityUser } from './dto/user.entity';
import { UserInterface } from './interface/user.interface';
import { UserLoginDto } from './dto/user.dto';

@Injectable()
export class UserService implements UserInterface {
  constructor(
    @InjectRepository(EntityUser)
    private usersRepository: Repository<EntityUser>,
    private dataSource: DataSource,
  ) {}
  
  async registUser(entityUser:EntityUser){
    try {
      const eu=await this.usersRepository.findOneBy({name:entityUser.name,password:entityUser.password});
      if(eu){
        throw new HttpException({message:'用户名已存在'},300);
      }
      entityUser.create_time=new Date();
      return await this.usersRepository.save(entityUser);
    } catch (error) {
      throw new HttpException(error,400);
    }
  } ;

  async loginUser(userLoginDto: UserLoginDto){
    try {
      return await this.usersRepository.createQueryBuilder('user')
      .select('user.id,user.name,user.email,user.phone')
      .where(userLoginDto)
      .getRawOne()
    } catch (error) {
      throw new HttpException(error,400);
    }
  }
}
