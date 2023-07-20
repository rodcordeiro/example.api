import { UsersService } from '@/modules/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateCollectionDTO } from '../dto/create.dto';
import { UpdateCollectionDTO } from '../dto/update.dto';
import { CollectionsEntity } from '../entities/collections.entity';

@Injectable()
export class CollectionsService {
  constructor(
    @InjectRepository(CollectionsEntity)
    private readonly collectionsRepository: Repository<CollectionsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async list(ownerId: string) {
    return this.collectionsRepository.find({
      where: {
        owner: { id: ownerId },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async view(options: FindOneOptions<CollectionsEntity>['where']) {
    try {
      return this.collectionsRepository.findOneOrFail({
        where: options,
      });
    } catch (err) {
      throw new NotFoundException(err.message);
    }
  }

  async create(data: CreateCollectionDTO) {
    const user = await this.usersService.findOne({ id: data.owner });
    const tag = this.collectionsRepository.create({ ...data, owner: user });
    return await this.collectionsRepository.save(tag);
  }

  async update(id: string, data: UpdateCollectionDTO) {
    const tag = await this.collectionsRepository.findOneOrFail({
      where: { id },
    });
    this.collectionsRepository.merge(tag, data);
    return await this.collectionsRepository.save(tag);
  }

  async delete(id: string) {
    await this.collectionsRepository.findOneOrFail({ where: { id } });
    await this.collectionsRepository.delete({ id });
  }

  async relatedBooks(id: string) {
    return this.collectionsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        books: true,
      },
      order: {
        books: { collectionOrder: 'ASC' },
      },
    });
  }
}
