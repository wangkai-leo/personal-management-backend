import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { EntityTask } from '../../task/dto/task.entity';
import { EntityPlanning } from '../../planning/dto/planning.entity';
import { EntityPurpose } from '../../purpose/dto/purpose.entity';
import { EntityQuestion } from '../../question/dto/question.entity';
import { EntityExam } from '../../exam/dto/exam.entity';
import { EntityWork } from '../../work/dto/work.entity';
import { EntityCompany } from '../../company/dto/company.entity';
import { EntityFinance } from '../../finance/dto/finance.entity';

@Entity()
export class EntityUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  phone: number;

  @Column({default:1})
  lever: number;

  @Column()
  create_time:Date

  @Column({ default: false })
  del_flag: boolean;

  @OneToMany(() => EntityTask, (entityTask) => entityTask.user)
  tasks: EntityTask[];

  @OneToMany(() => EntityPlanning, (entityPlanning) => entityPlanning.user)
  plannings: EntityPlanning[];

  @OneToMany(() => EntityPurpose, (entityPurpose) => entityPurpose.user)
  purposes: EntityPurpose[];

  @OneToMany(() => EntityQuestion, (entityQuestion) => entityQuestion.user)
  questions: EntityQuestion[];

  @OneToMany(() => EntityExam, (entityExam) => entityExam.user)
  exams: EntityExam[];

  @OneToMany(() => EntityWork, (entityWork) => entityWork.user)
  works: EntityWork[];

  @OneToOne(() => EntityCompany, (entityCompany) => entityCompany.user)
  @JoinColumn()
  company:EntityCompany

  @OneToMany(() => EntityFinance, (entityFinance) => entityFinance.user)
  finance:EntityFinance
}
