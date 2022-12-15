import { EntityUser } from "../../user/dto/user.entity";
import { Column, Entity, Generated, JoinColumn, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { EntityQuestion } from '../../question/dto/question.entity';

@Entity()
export class EntityExam{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  test_id:string;

  @Column({nullable:true})
  scope_type:number;

  @Column({type:'text'})
  answer_context:string;

  @Column({default:0})
  test_score:number;

  @Column()
  create_time:Date

  @Column({default:0})
  del_flag:number

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.id)
  user:EntityUser
  
  
  @ManyToOne(()=>EntityQuestion,(entityQuestion)=>entityQuestion.exams)
  question:EntityQuestion
}