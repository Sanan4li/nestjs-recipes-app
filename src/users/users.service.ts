import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersEntity: Repository<Users>,
  ) {}

  async createUser(body: CreateUserDTO) {
    const data = await this.usersEntity.save(body);
    return data;
  }

  async getAllUsers() {
    const data = await this.usersEntity.find({});
    if (!data) {
      throw new NotFoundException('Users not found');
    }
    return data;
  }

  async getUserById(id: string) {
    const data = await this.usersEntity.findOneBy({ id: Number(id) });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  async updateUser(id: string, body: CreateUserDTO) {
    const data = await this.getUserById(id);
    if (!data) {
      throw new NotFoundException('User not found');
    }
    const updatedData = { ...data, ...body };
    return await this.usersEntity.save(updatedData);
  }
}
