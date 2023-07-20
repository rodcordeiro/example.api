import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsModule } from '@/modules/tags/tags.module';
import { CollectionsModule } from '@/modules/collections/collection.module';
import { UsersModule } from '@/modules/users/users.module';
import { AnnotationsModule } from '@/modules/annotations/annotations.module';

import { BooksController } from './controllers/books.controller';
import { BooksEntity } from './entities/books.entity';
import { BooksService } from './services/books.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([BooksEntity]),
    UsersModule,
    forwardRef(() => TagsModule),
    forwardRef(() => CollectionsModule),
    forwardRef(() => AnnotationsModule),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
