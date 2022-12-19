import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { EntityWork } from "./work.entity";
import { EntityEmployee } from '../../employee/dto/employee.entity';

@Entity()
export class EntityWorkPlanning{
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({default:0})
  cost_date:number;

  @Column()
  create_time:Date;

  @Column()
  employee_id:number;

  @Column({default:0})
  del_flag:number

  @ManyToOne(()=>EntityWork,(entityWork)=>entityWork.numbers)
  work:EntityWork
}