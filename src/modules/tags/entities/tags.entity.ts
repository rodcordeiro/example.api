import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
} from 'typeorm';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { BooksEntity } from '@/modules/books/entities/books.entity';

@Entity({ name: 'gm_tb_tags' })
export class TagsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UsersEntity, user => user.tags)
  @JoinColumn()
  owner: UsersEntity;

  @ManyToMany(() => BooksEntity, book => book.tags, { cascade: true })
  @JoinTable()
  books: BooksEntity[];
}
