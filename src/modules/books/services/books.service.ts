import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { BooksEntity } from '@/modules/books/entities/books.entity';
import { CreateBookDTO } from '@/modules/books/dto/create.dto';
import { UpdateBookDTO } from '@/modules/books/dto/update.dto';
import { UsersService } from '@/modules/users/services/users.service';
import { TagsService } from '@/modules/tags/services/tags.service';
import { CollectionsService } from '@/modules/collections/services/collections.service';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly booksRepository: Repository<BooksEntity>,
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly collectionsService: CollectionsService,
  ) {}

  async list(ownerId: string) {
    return this.booksRepository.find({
      relations: {
        tags: true,
        collection: true,
      },
      where: {
        owner: { id: ownerId },
      },
    });
  }
  async view(
    options: FindOneOptions<BooksEntity>['where'],
    loadRelations = true,
  ) {
    try {
      return this.booksRepository
        .findOneOrFail({
          relations: {
            collection: true,
            tags: loadRelations,
            // annotation: true,
          },
          where: options,
        })
        .then(data => data)
        .catch(err => {
          throw new NotFoundException(err.message);
        });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }
  async create(data: CreateBookDTO) {
    const user = await this.usersService.findOne({ id: data.owner });
    let collection = undefined;
    if (data.collection) {
      collection = await this.collectionsService.view({
        id: data.collection,
      });
    }
    const book = this.booksRepository.create({
      ...data,
      owner: user,
      collection,
    });
    return await this.booksRepository.save(book);
  }
  async update(id: string, data: UpdateBookDTO) {
    const book = await this.booksRepository.findOneOrFail({ where: { id } });
    console.log({ data });
    const collection = await this.collectionsService.view({
      id: data.collection,
    });
    console.log(book, { data, collection });
    this.booksRepository.merge(book, { ...data, collection });
    return await this.booksRepository.save(book);
  }
  async delete(id: string) {
    await this.booksRepository.findOneOrFail({ where: { id } });
    await this.booksRepository.delete({ id });
  }

  async favorite(id: string) {
    const book = await this.booksRepository.findOneOrFail({ where: { id } });
    this.booksRepository.merge(book, {
      favorited: true,
    });
    return await this.booksRepository.save(book);
  }
  async unfavorite(id: string) {
    const book = await this.booksRepository.findOneOrFail({ where: { id } });
    this.booksRepository.merge(book, {
      favorited: false,
    });

    return await this.booksRepository.save(book);
  }

  async assignTags(id: string, tags: string[]) {
    try {
      const validateTags = await Promise.all(
        tags.map(tag => this.tagsService.view({ id: tag })),
      );
      const book = await this.booksRepository.findOneOrFail({ where: { id } });
      this.booksRepository.merge(book, {
        tags: validateTags,
      });
      return await this.booksRepository.save(book);
    } catch (err) {
      console.error(err);
      throw new NotFoundException('Invalid Tag');
    }
  }
  async deassignTags(id: string, tag: string) {
    try {
      const book = await this.booksRepository.findOneOrFail({
        where: { id },
        relations: { tags: true, owner: true },
      });
      book.tags = book.tags.filter(t => t.id !== tag);
      return await this.booksRepository.save(book);
    } catch (err) {
      console.error(err);
      throw new NotFoundException(err.message);
    }
  }
}
