import { UsersService } from '@/modules/users/services/users.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateTagDTO } from '../dto/create.dto';
import { UpdateTagDTO } from '../dto/update.dto';
import { TagsEntity } from '../entities/tags.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsEntity)
    private readonly tagsRepository: Repository<TagsEntity>,
    private readonly usersService: UsersService,
  ) {}

  async list(ownerId: string) {
    return this.tagsRepository.find({
      where: {
        owner: { id: ownerId },
      },
      order: { createdAt: 'DESC' },
    });
  }

  async view(options: FindOneOptions<TagsEntity>['where']) {
    try {
      return await this.tagsRepository.findOneByOrFail(options);
    } catch (err) {
      console.error(err);
      throw new NotFoundException('Tag not found');
    }
  }

  async create(data: CreateTagDTO) {
    const user = await this.usersService.findOne({ id: data.owner });
    const tag = this.tagsRepository.create({ ...data, owner: user });
    return await this.tagsRepository.save(tag);
  }

  async update(id: string, data: UpdateTagDTO) {
    const tag = await this.tagsRepository.findOneOrFail({ where: { id } });
    this.tagsRepository.merge(tag, data);
    return await this.tagsRepository.save(tag);
  }

  async delete(id: string) {
    await this.tagsRepository.findOneOrFail({ where: { id } });
    await this.tagsRepository.delete({ id });
  }

  async relatedBooks(id: string) {
    return this.tagsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: {
        books: true,
      },
    });
  }
}
