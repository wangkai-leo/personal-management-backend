import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityUser } from '../../user/dto/user.entity';
import { EntityTask } from '../../task/dto/task.entity';

@Entity()
export class EntityPlanning extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column({nullable:true})
  date:Date;

  @Column({length:5,default:''})
  begin_time:string

  @Column({length:5,default:''})
  end_time:string

  @Column({default:0})
  is_repeat:number

  @Column()
  create_time:Date

  @Column({default:0})
  del_flag:number

  @Column({default:0})
  is_complete:number

  @Column({nullable:true})
  complete_time:Date

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.plannings)
  user:EntityUser

  @ManyToOne(()=>EntityTask,(entityTask)=>entityTask.plannings)
  task:EntityTask
}