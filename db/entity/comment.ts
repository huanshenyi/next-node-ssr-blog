import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { User } from './user';
import { Article } from './article';

@Entity({ name: 'comments' })
export class Comment extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column('varchar',{nullable:false})
    content!:string;

    @Column('datetime',{nullable:true})
    create_time!:Date;

    @Column('datetime',{nullable:true})
    update_time!:Date;

    @ManyToOne(()=>User)
    @JoinColumn({name: 'user_id'})
    user!:User;

    @ManyToOne(()=>Article)
    @JoinColumn({name: 'article_id'})
    article!:Article;
}
