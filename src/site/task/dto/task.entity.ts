import { EntityPurpose } from '../../purpose/dto/purpose.entity';
import { EntityUser } from '../../user/dto/user.entity';
import { EntityQuestion } from '../../question/dto/question.entity';
import { EntityPlanning } from '../../planning/dto/planning.entity';
import { DimScope } from '../../scope/dto/scope.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

export enum TaskImportance{
  IMPURGENT='IU',
  URGENT='Urgent',
  IMPORTANCE='Importance',
  OTHER='Other',
}

@Entity()
export class EntityTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  begin_date: Date;

  @Column({ nullable: true })
  end_date: Date;

  @Column({
    type:"enum",
    enum:TaskImportance,
    default:TaskImportance.OTHER
  })
  importance: TaskImportance; //1 :the importance, the urgency,

  @Column({ default: 1 })
  score: number; //How many score being given when complete this task

  @Column({ nullable: true })
  complete_date: Date; //the complete teme

  @Column({default:0})
  parent_id:number

  @Column({ default: 0 })
  is_complete: number; //have or haven't finish the task

  @Column()
  create_time: Date; // The create time

  @Column({ default: 0 })
  del_flag: number; //0:normal 1:deleted

  @ManyToOne(()=>DimScope,(dimScope)=>dimScope.tasks)
  scope:DimScope

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.tasks)
  user:EntityUser
  
  @OneToMany(()=>EntityPurpose,(entityPurpose)=>entityPurpose.task)
  purposes:EntityPurpose[]

  @OneToMany(()=>EntityQuestion,(entityQuestion)=>entityQuestion.task)
  questions:EntityQuestion[]

  @OneToMany(()=>EntityPlanning,(entityPlanning)=>entityPlanning.task)
  plannings:EntityPlanning[]
}
