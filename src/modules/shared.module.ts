import { Module } from '@nestjs/common';

import { UsersModule } from '@/modules/users/users.module';
import { BooksModule } from '@/modules/books/books.module';
import { AuthModule } from '@/modules/auth/auth.module';
import { HealthModule } from '@/modules/health/health.module';
import { CollectionsModule } from './collections/collection.module';
import { TagsModule } from '@/modules/tags/tags.module';
import { AnnotationsModule } from './annotations/annotations.module';

@Module({
  imports: [
    UsersModule,
    BooksModule,
    AuthModule,
    HealthModule,
    CollectionsModule,
    // AnnotationsModule,
    // TagsModule,
  ],
  controllers: [],
  providers: [],
})
export class SharedModule {}
