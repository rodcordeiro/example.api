import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { TagsEntity } from '@/modules/tags/entities/tags.entity';
import { CollectionsEntity } from '@/modules/collections/entities/collections.entity';
import { AnnotationsEntity } from '@/modules/annotations/entities/annotations.entity';

@Entity({ name: 'gm_tb_books' })
export class BooksEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  author: string;
  @Column()
  releaseYear: number;

  @Column()
  favorited: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UsersEntity, user => user.books)
  @JoinColumn()
  owner: UsersEntity;

  @ManyToOne(() => CollectionsEntity, collection => collection.books)
  @JoinColumn()
  collection?: CollectionsEntity;

  @OneToOne(() => AnnotationsEntity, annotation => annotation.book)
  @JoinColumn()
  annotation?: AnnotationsEntity;

  @Column({ default: null })
  collectionOrder?: number;

  @ManyToMany(() => TagsEntity, tags => tags.books)
  @JoinTable()
  tags: TagsEntity[];

  // TODO
  /**
   * image
   * tags
   * totalPages
   * annotations
   */
}
