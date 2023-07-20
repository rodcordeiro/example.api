import { forwardRef, Module } from '@nestjs/common';

import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { TagsController } from './controllers/tags.controller';
import { TagsService } from './services/tags.service';
import { TagsEntity } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagsEntity]),
    forwardRef(() => BooksModule),
    UsersModule,
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule {}
