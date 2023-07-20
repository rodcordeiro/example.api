import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseUUIDPipe,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { IAuthenticatedUser } from '@/common/interfaces/authenticated.interface';
import { Auth } from '@/common/decorators/auth.decorator';

import { TagsService } from '@/modules/tags/services/tags.service';
import { CreateTagDTO } from '../dto/create.dto';
import { UpdateTagDTO } from '../dto/update.dto';

@Auth()
@ApiTags('tags')
@Controller({
  version: '1',
  path: '/tags',
})
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}
  @Get()
  async list(@Req() req: IAuthenticatedUser, @Res() res: FastifyReply) {
    const tags = await this.tagsService.list(req.user.id);
    return res.header('X-TOTAL-TAGS', tags.length).send(tags);
  }
  @Get(':id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.tagsService.view({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateTagDTO) {
    return this.tagsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateTagDTO,
  ) {
    return this.tagsService.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsService.delete(id);
  }
  @Get(':id/books')
  async filterBooks(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tagsService.relatedBooks(id);
  }
}
