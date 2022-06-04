import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'

@Entity({ name: 'users' })
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column('varchar',{nullable:true})
    nickname!:string;

    @Column('varchar',{nullable:true})
    avatar!:string;

    @Column('varchar',{nullable:true})
    job!:string;

    /*紹介*/
    @Column('varchar',{nullable:true})
    introduce!:string;
}
