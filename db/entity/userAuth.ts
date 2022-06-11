import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'user_auths' })
export class UserAuth extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @ManyToOne(() => User, {cascade:true})
    @JoinColumn({name: 'user_id'})
    user!:User;

    @Column('varchar',{nullable:true})
    identity_type!:string;

    @Column('varchar',{nullable:true})
    identfier!:string;

    @Column('varchar',{nullable:true})
    credential!:string;
}
