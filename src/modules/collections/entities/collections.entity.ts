import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { BooksEntity } from '@/modules/books/entities/books.entity';

@Entity({ name: 'gm_tb_collections' })
export class CollectionsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UsersEntity, user => user.collections)
  @JoinColumn()
  owner: UsersEntity;

  @OneToMany(() => BooksEntity, book => book.collection, { cascade: true })
  @JoinTable()
  books: BooksEntity[];
}
