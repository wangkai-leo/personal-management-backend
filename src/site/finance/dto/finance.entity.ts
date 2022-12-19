import { EntityEmployee } from "src/site/employee/dto/employee.entity";
import { EntityWork } from "src/site/work/dto/work.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { EntityUser } from '../../user/dto/user.entity';

@Entity()
export class EntityFinance{
    @PrimaryGeneratedColumn()
    id:number;
  
    @Column({default:0})
    quotation:number;


    @Column({default:0})
    other_cost:number

    @Column({default:0})
    manpower_cost:number

    @Column()
    create_time:Date

    @Column({default:0})
    domain_cost:number;

    @Column({default:0})
    del_flag:number;

    @OneToOne(()=>EntityWork,(entityWork)=>entityWork.finance)
    @JoinColumn()
    work:EntityWork

    @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.finance)
    user:EntityUser
}
