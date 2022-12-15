import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class EntityMaxim extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  content:string

  @Column({length:20})
  author:string

  @Column()
  create_time:Date

  @Column({default:0})
  del_flag:number
}