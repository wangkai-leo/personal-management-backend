import { EntityWork } from "src/site/work/dto/work.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { EntityUser } from '../../user/dto/user.entity';

@Entity()
export class EntityFinance{
    @PrimaryGeneratedColumn()
    id:number;
  
    @Column({default:0})
    quotation:number;
  
    @Column()
    create_time:Date
  
    @Column({default:0})
    del_flag:number;

    @OneToOne(()=>EntityWork,(entityWork)=>entityWork.finance)
    @JoinColumn()
    work:EntityWork
    
    @ManyToOne(()=>EntityUser,(entityUser)=>entityUser.finance)
    user:EntityUser
}
