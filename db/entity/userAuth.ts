import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity({ name: 'user_auths' })
export class UserAuth extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @ManyToOne(() => User, {cascade:true})
    @JoinColumn({name: 'user_id'})
    user!:User;

    @Column('text',{nullable:true})
    identity_type!:string;

    @Column('text',{nullable:true})
    identfier!:string;

    @Column('text',{nullable:true})
    credential!:string;
}
