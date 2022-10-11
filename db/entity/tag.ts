import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, JoinTable, ManyToMany } from 'typeorm'
import { User } from './user';
import { Article } from './article';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    readonly id!: number;

    @Column('varchar',{nullable:false})
    title!:string;

    @Column('varchar',{nullable:true})
    icon!:Date;

    @Column('int',{nullable:true})
    follow_count!:number;

    @Column('int',{nullable:true})
    article_count!:number;

    @ManyToMany(()=> User, {
        cascade: true,
    })
    @JoinTable({
        name: "tags_users_rel",
        joinColumn: {
            name: 'tag_id',
        },
        inverseJoinColumn: {
            name: 'user_id'
        }
    })
    users!:User[]

    @ManyToMany(()=> Article, {
        cascade: true,
    })
    @JoinTable({
        name: "articles_tags_rel",
        joinColumn: {
            name: 'tag_id',
        },
        inverseJoinColumn: {
            name: 'article_id'
        }
    })
    articles!:Article[]

}
