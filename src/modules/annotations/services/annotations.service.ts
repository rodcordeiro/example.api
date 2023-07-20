import { UsersService } from '@/modules/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { AnnotationsEntity } from '../entities/annotations.entity';
import { CreateAnnotationDTO } from '../dto/create.dto';
import { UpdateAnnotationDTO } from '../dto/update.dto';
import { BooksService } from '@/modules/books/services/books.service';

@Injectable()
export class AnnotationsService {
  constructor(
    @InjectRepository(AnnotationsEntity)
    private readonly annotationsRepository: Repository<AnnotationsEntity>,
    private readonly usersService: UsersService, // private readonly booksService: BooksService,
  ) {}

  async list(ownerId: string) {
    return this.annotationsRepository.find({
      where: {
        owner: { id: ownerId },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async view(options: FindOneOptions<AnnotationsEntity>['where']) {
    try {
      return await this.annotationsRepository.findOneByOrFail(options);
    } catch (err) {
      console.error(err);
      throw new NotFoundException('Tag not found');
    }
  }

  async create(data: any) {
    const user = await this.usersService.findOne({ id: data.owner });
    // const book = await this.booksService.view({ id: data.book });
    const tag = this.annotationsRepository.create({
      ...data,
      owner: user,
      // book,
    });
    return await this.annotationsRepository.save(tag);
  }

  async update(id: string, data: UpdateAnnotationDTO) {
    const tag = await this.annotationsRepository.findOneOrFail({
      where: { id },
    });
    this.annotationsRepository.merge(tag, data);
    return await this.annotationsRepository.save(tag);
  }

  async delete(id: string) {
    await this.annotationsRepository.findOneOrFail({ where: { id } });
    await this.annotationsRepository.delete({ id });
  }
}
