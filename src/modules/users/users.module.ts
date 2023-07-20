import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersControllers } from '@/modules/users/controllers/users.controller';
import { UsersEntity } from '@/modules/users/entities/users.entity';
import { UsersService } from '@/modules/users/services/users.service';
import { AnnotationsEntity } from '../annotations/entities/annotations.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    forwardRef(() => AnnotationsEntity),
  ],
  controllers: [UsersControllers],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
