import { forwardRef, Module } from '@nestjs/common';

import { BooksModule } from '@/modules/books/books.module';
import { UsersModule } from '@/modules/users/users.module';
import { AnnotationsController } from './controllers/annotations.controller';
import { AnnotationsService } from './services/annotations.service';
import { AnnotationsEntity } from './entities/annotations.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnnotationsEntity]),
    forwardRef(() => BooksModule),
    forwardRef(() => UsersModule),
  ],
  controllers: [AnnotationsController],
  providers: [AnnotationsService],
  exports: [AnnotationsService],
})
export class AnnotationsModule {}
