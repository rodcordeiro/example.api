import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { BooksEntity } from '@/modules/books/entities/books.entity';

@Entity({ name: 'gm_tb_annotations' })
export class AnnotationsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  annotation: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @ManyToOne(() => UsersEntity)
  @JoinColumn()
  owner: UsersEntity;

  @OneToOne(() => BooksEntity, book => book.annotation)
  @JoinColumn()
  book: BooksEntity;
}
