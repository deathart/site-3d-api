import { Inject, Injectable } from '@nestjs/common';

import { Model } from 'mongoose';

import { Users } from '../shareds/interfaces/users.interface';
import { CreateUserDto } from '../shareds/dto/auth/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('UsersModelToken') private readonly usersModel: Model<Users>) {}

  async create(createUsersDto: CreateUserDto): Promise<Users> {
    const createUsers = new this.usersModel(createUsersDto);

    return await createUsers.save();
  }

  async findAll(): Promise<Users[]> {
    return await this.usersModel.find().exec();
  }

  async checkAuth(email: string): Promise<Users> {
    return await this.usersModel.findOne({email}).exec();
  }

  async findOneByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({email}).exec();
  }

  async findOneById(id: string): Promise<Users> {
    return await this.usersModel.findById(id).exec();
  }
}
