import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';

import { UsersEntity } from '@/modules/users/entities/users.entity';
import { CreateUserDTO } from '@/modules/users/dto/create.dto';
import { UpdateUserDTO } from '@/modules/users/dto/update.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly usersRepository: Repository<UsersEntity>,
  ) {}

  async findAll() {
    return await this.usersRepository.find({
      select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
    });
  }
  async view(options: FindOneOptions<UsersEntity>['where']) {
    try {
      console.log({ options });
      const user = await this.usersRepository.findOneOrFail({
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: {
          ...options,
        },
        relations: {
          books: true,
          tags: true,
          collections: true,
          annotations: true,
        },
      });
      const lastAnnotation = {
        id: '0',
        bookId: '0',
        annotation: 'Lorem ipsum',
        owner: 'author',
      };

      return {
        ...user,
        lastAnnotation,
      };
    } catch (err) {
      console.error(err);
      throw new NotFoundException('User not found');
    }
  }
  async findOne(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this.usersRepository.findOneOrFail({
        select: ['id', 'name', 'email', 'createdAt', 'updatedAt'],
        where: options,
      });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }
  async validate(options: FindOneOptions<UsersEntity>['where']) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: options,
      });
    } catch (err) {
      throw new NotFoundException('User not found');
    }
  }

  async store(data: CreateUserDTO) {
    const alreadyRegistered = await this.usersRepository.findOneBy({
      email: data.email,
    });
    if (alreadyRegistered)
      throw new BadRequestException(`Email ${data.email} already in use`);
    const user = this.usersRepository.create(data);
    return await this.usersRepository.save(user);
  }
  async update(id: string, data: UpdateUserDTO) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, data);
    return await this.usersRepository.save(user);
  }
  async destroy(id: string) {
    await this.usersRepository.findOneOrFail({ where: { id } });
    await this.usersRepository.delete({ id });
  }

  async updateToken(id: string, refreshToken: string) {
    const user = await this.usersRepository.findOneOrFail({ where: { id } });
    this.usersRepository.merge(user, { refreshToken });
    await this.usersRepository.save(user);
  }
}
