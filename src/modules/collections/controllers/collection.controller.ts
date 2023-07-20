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
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { ApiTags } from '@nestjs/swagger';
import { IAuthenticatedUser } from '@/common/interfaces/authenticated.interface';

import { CollectionsService } from '@/modules/collections/services/collections.service';
import { CreateCollectionDTO } from '../dto/create.dto';
import { UpdateCollectionDTO } from '../dto/update.dto';
import { Auth } from '@/common/decorators/auth.decorator';

@Auth()
@ApiTags('collections')
@Controller({
  version: '1',
  path: '/collections',
})
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}
  @Get()
  async list(@Req() req: IAuthenticatedUser, @Res() res: FastifyReply) {
    const tags = await this.collectionsService.list(req.user.id);
    return res.header('X-TOTAL-COLLECTIONS', tags.length).send(tags);
  }
  @Get(':id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.collectionsService.view({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateCollectionDTO) {
    return this.collectionsService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateCollectionDTO,
  ) {
    return this.collectionsService.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.collectionsService.delete(id);
  }
  @Get(':id/books')
  async filterBooks(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.collectionsService.relatedBooks(id);
  }
}
