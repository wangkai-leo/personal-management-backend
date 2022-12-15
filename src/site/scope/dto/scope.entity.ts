import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityTask } from '../../task/dto/task.entity';
import { EntityQuestion } from '../../question/dto/question.entity';


@Entity()

export class DimScope extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column({length:20})
  title:string;

  @Column()
  create_time:Date

  @Column({default:0})
  del_flag:number

  @OneToMany(()=>EntityTask,(entityTask)=>entityTask.scope)
  tasks:EntityTask[]

  @OneToMany(()=>EntityQuestion,(entityQuestion)=>entityQuestion.scope)
  questions:EntityQuestion[]
}