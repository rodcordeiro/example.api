import { forwardRef, Module } from '@nestjs/common';

import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { CollectionsController } from './controllers/collection.controller';
import { CollectionsService } from './services/collections.service';
import { CollectionsEntity } from './entities/collections.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollectionsEntity]),
    forwardRef(() => BooksModule),
    UsersModule,
  ],
  controllers: [CollectionsController],
  providers: [CollectionsService],
  exports: [CollectionsService],
})
export class CollectionsModule {}
