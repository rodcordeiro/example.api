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

import { AuthGuard } from '@nestjs/passport';

import { AnnotationsService } from '@/modules/annotations/services/annotations.service';
import { CreateAnnotationDTO } from '../dto/create.dto';
import { UpdateAnnotationDTO } from '../dto/update.dto';

@UseGuards(AuthGuard('jwt'))
@ApiTags('annotations')
@Controller({
  version: '1',
  path: '/annotations',
})
export class AnnotationsController {
  constructor(private readonly annotationService: AnnotationsService) {}
  @Get()
  async list(@Req() req: IAuthenticatedUser, @Res() res: FastifyReply) {
    const tags = await this.annotationService.list(req.user.id);
    return res.header('X-TOTAL-ANNOTATIONS', tags.length).send(tags);
  }
  @Get(':id')
  async view(@Param('id', new ParseUUIDPipe()) id: string) {
    return await this.annotationService.view({ id });
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() body: CreateAnnotationDTO) {
    return this.annotationService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() body: UpdateAnnotationDTO,
  ) {
    return this.annotationService.update(id, body);
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.annotationService.delete(id);
  }
}
