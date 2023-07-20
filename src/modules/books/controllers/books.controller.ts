import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  UseGuards,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { IAuthenticatedUser } from '@/common/interfaces/authenticated.interface';

import { CreateBookDTO } from '@/modules/books/dto/create.dto';
import { UpdateBookDTO } from '@/modules/books/dto/update.dto';
import { BooksService } from '@/modules/books/services/books.service';
import { AssignTagDTO } from '../dto/assingTag.dto';
import { Auth } from '@/common/decorators/auth.decorator';

@Auth()
@ApiTags('books')
@Controller({
  version: '1',
  path: '/books',
})
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  async list(@Req() req: IAuthenticatedUser, @Res() res: FastifyReply) {
    const books = await this.booksService.list(req.user.id);
    return res.header('X-TOTAL-BOOKS', books.length).send(books);
  }

  @Get(':id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.view({ id });
  }

  @Post()
  async create(@Body() body: CreateBookDTO) {
    return this.booksService.create(body);
  }

  @Post(':id/favorite')
  @HttpCode(HttpStatus.NO_CONTENT)
  async favorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.favorite(id);
  }

  @Post(':id/unfavorite')
  @HttpCode(HttpStatus.NO_CONTENT)
  async unfavorite(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.unfavorite(id);
  }

  @Post(':id/tags')
  @HttpCode(HttpStatus.CREATED)
  async assignTag(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: AssignTagDTO,
  ) {
    const { tags } = body;
    return this.booksService.assignTags(id, tags);
  }

  @Delete(':id/tags')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deassignTag(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: { tag: string },
  ) {
    const { tag } = body;
    return this.booksService.deassignTags(id, tag);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateBookDTO,
  ) {
    console.log({ body });
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.booksService.delete(id);
  }
}
