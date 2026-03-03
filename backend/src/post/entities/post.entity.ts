import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { Category } from "../../category/entities/category.entity";
import { Author } from "../../author/entities/author.entity";
import { Tag } from "../../tag/entities/tag.entity";

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ name: 'category_id', nullable: true })
    category_id: number;

    @ManyToOne(() => Category, category => category.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'category_id' })
    category: Category;

    @Column({ name: 'author_id', nullable: true })
    author_id: number;

    @ManyToOne(() => Author, author => author.posts, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: Author;

    @ManyToMany(() => Tag, tag => tag.posts)
    @JoinTable({ name: 'post_tag' })
    tags: Tag[];
}
