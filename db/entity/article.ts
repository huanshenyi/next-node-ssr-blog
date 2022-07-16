import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user';

@Entity({ name: 'articles' })
export class Article extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column('varchar',{nullable:false})
    title!:string;

    @Column('text',{nullable:true})
    content!:string;

    @Column('int',{nullable:true})
    views!:number;

    @Column('datetime',{nullable:true})
    create_time!:Date;

    @Column('datetime',{nullable:true})
    update_time!:Date;

    @Column('bit',{nullable:true})
    is_delete!:number;

    @ManyToOne(()=>User)
    @JoinColumn({name: 'user_id'})
    user!:User;
}
