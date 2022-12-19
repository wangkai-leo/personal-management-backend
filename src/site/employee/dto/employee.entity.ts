import { EntityFinance } from "../../finance/dto/finance.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityCompany } from '../../company/dto/company.entity';


@Entity()
export class EntityEmployee{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  mobile: string;

  @Column({default:10000})
  salary:number;

  @Column({nullable:true})
  position:string;

  @Column()
  create_time:Date

  @Column({ default: false })
  del_flag: boolean;

  @ManyToOne(() => EntityCompany,entityCompany=>entityCompany.employee)
  company:EntityCompany

  // @ManyToMany(()=>EntityFinance,(entityFinance)=>entityFinance.employees)
  // finances:EntityFinance[]
}