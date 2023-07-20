import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { hashSync } from 'bcrypt';
import { BooksEntity } from '@/modules/books/entities/books.entity';
import { TagsEntity } from '@/modules/tags/entities/tags.entity';
import { CollectionsEntity } from '@/modules/collections/entities/collections.entity';
import { AnnotationsEntity } from '@/modules/annotations/entities/annotations.entity';

@Entity({ name: 'gm_tb_users' })
export class UsersEntity {
  /** Columns */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  refreshToken: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  /** Joins */
  @OneToMany(() => BooksEntity, book => book.owner)
  @JoinColumn()
  books: BooksEntity[];

  @OneToMany(() => TagsEntity, tag => tag.owner)
  @JoinColumn()
  tags: TagsEntity[];

  @OneToMany(() => CollectionsEntity, collection => collection.owner)
  @JoinColumn()
  collections: CollectionsEntity[];

  @OneToMany(() => AnnotationsEntity, annotation => annotation.owner)
  @JoinColumn()
  annotations: AnnotationsEntity[];

  /** Methods */
  @BeforeInsert()
  hash() {
    this.password = hashSync(this.password, 10);
  }
}
