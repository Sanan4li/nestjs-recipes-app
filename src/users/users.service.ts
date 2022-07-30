import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/database';
import { hashPassword } from 'src/utils';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/CreateUser.dto';
import { UpdateUserDTO } from './dto/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersEntity: Repository<Users>,
  ) {}

  createUser(body: CreateUserDTO) {
    const password = hashPassword(body.password);
    const newData = { ...body, password };
    const data = this.usersEntity.save(newData);
    return data;
  }

  getAllUsers() {
    const data = this.usersEntity.find({});
    if (!data) {
      throw new NotFoundException('Users not found');
    }
    return data;
  }

  getUserById(id: string) {
    const data = this.usersEntity.findOneBy({ id: Number(id) });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  getUserByUsername(username: string) {
    const data = this.usersEntity.findOneBy({ username });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    return data;
  }

  updateUser(id: string, body: UpdateUserDTO) {
    const data = this.getUserById(id);
    if (!data) {
      throw new NotFoundException('User not found');
    }
    const updatedData = { ...data, ...body };
    return this.usersEntity.save(updatedData);
  }
}
