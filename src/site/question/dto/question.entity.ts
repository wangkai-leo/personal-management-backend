import { Column, Entity, ManyToOne, OneToMany, JoinColumn, PrimaryGeneratedColumn, OneToOne, ManyToMany } from "typeorm";
import { EntityTask } from "../../task/dto/task.entity";
import { EntityExam } from '../../exam/dto/exam.entity';
import { EntityUser } from "../../user/dto/user.entity";
import { DimScope } from '../../scope/dto/scope.entity';
@Entity()
export class EntityQuestion{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column({nullable:true,type:'text'})
  correct_answer:string;
  
  @Column()
  create_time: Date;

  @Column({default:0})
  for_exam:number

  @Column({ default: 0 })
  del_flag: number;

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.questions)
  user:EntityUser
  
  @ManyToOne(()=>EntityTask,(entityTask)=>entityTask.questions)
  task:EntityTask

  @ManyToOne(()=>DimScope,(dimScope)=>dimScope.questions)
  scope:DimScope

  @OneToMany(()=>EntityExam,(entityExam)=>entityExam.question)
  exams:EntityExam[]
}