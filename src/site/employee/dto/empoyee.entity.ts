import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { EntityCompany } from '../../company/dto/company.entity';


@Entity()
export class EntityEmployee{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({nullable:true})
  title:number;

  @Column({nullable:true})
  email: string;

  @Column({nullable:true})
  phone: number;

  @Column({default:10000})
  salary:number;

  @Column()
  create_time:Date

  @Column({ default: false })
  del_flag: boolean;

  @ManyToOne(() => EntityCompany,entityCompany=>entityCompany.employee)
  company:EntityCompany
}