import { EntityUser } from "../../user/dto/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany } from 'typeorm';
import { EntityFinance } from '../../finance/dto/finance.entity';
import { EntityWorkPlanning } from './work.planning.entity';


@Entity()
export class EntityWork{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  name:string;

  @Column({length:20})
  type:string;

  @Column({default:''})
  description:string;

  @Column({default:''})
  link:string;

  @Column({default:''})
  code:string

  @Column({default:''})
  cover:string;

  @Column({default:''})
  images:string;

  @Column({default:''})
  video:string;

  @Column({nullable:true})
  customer:Date

  @Column({nullable:true})
  begin_date:Date

  @Column({default:''})
  end_date:string

  @Column()
  create_time:Date;

  @Column({default:0})
  del_flag:number

  @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.id)
  user:EntityUser

  @OneToOne(()=>EntityFinance,(entityFinance)=>entityFinance.work)
  finance:EntityFinance

  @OneToMany(()=>EntityWorkPlanning,(entityWorkNumber)=>entityWorkNumber.work)
  numbers:EntityWorkPlanning[]

}