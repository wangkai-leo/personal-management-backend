import { EntityUser } from "../../user/dto/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityTask } from '../../task/dto/task.entity';


@Entity()

export class EntityPurpose extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:String;
  
  @Column({default:0})
  is_rechive:number

  @Column()
  create_time:Date

  @Column({default:0})
  del_flag:number

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.id)
  user:EntityUser

  @ManyToOne(()=>EntityTask,(entityTask)=>entityTask.id)
  task:EntityTask


}