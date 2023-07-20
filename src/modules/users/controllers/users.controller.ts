import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  UseGuards,
  Res,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { UpdateUserDTO } from '@/modules/users/dto/update.dto';
import { UsersService } from '@/modules/users/services/users.service';
import { ApiTags } from '@nestjs/swagger';
import { Auth } from '@/common/decorators/auth.decorator';
@ApiTags('user')
@Controller({
  version: '1',
  path: '/users',
})
@Auth()
export class UsersControllers {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async index() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async view(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Res() res: FastifyReply,
  ) {
    const user = await this.usersService.view({ id });
    return res
      .headers({
        'X-TOTAL-BOOKS': user.books.length,
        'X-TOTAL-TAGS': user.tags.length,
        'X-TOTAL-COLLECTIONS': user.collections.length,
        'X-TOTAL-ANOTATIONS': 0,
        'X-TOTAL-FAVORITED': user.books.reduce(
          (acc, book) => (book.favorited ? acc + 1 : acc),
          0,
        ),
      })
      .send(user);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateUserDTO,
  ) {
    return await this.usersService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async destroy(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.usersService.destroy(id);
  }
}
