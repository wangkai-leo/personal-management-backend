import { Column, Entity, PrimaryGeneratedColumn, OneToMany, OneToOne } from 'typeorm';
import { EntityEmployee } from '../../employee/dto/empoyee.entity';
import { EntityUser } from '../../user/dto/user.entity';


@Entity()
export class EntityCompany{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  create_time:Date;

  @Column({ default: false })
  del_flag: boolean;

  @OneToMany(() => EntityEmployee,entityEmployee=>entityEmployee.company)
  employee:EntityEmployee

  @OneToOne(() => EntityUser,entityUser=>entityUser.company)
  user:EntityUser
}