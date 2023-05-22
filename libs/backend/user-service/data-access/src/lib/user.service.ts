import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponse,
} from '@schoolinc/shared/api-interfaces';
import { UserEntity } from './entities/user.entity';
import { ApolloError } from 'apollo-server-express';


@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM) {}

  private readonly userRepository = this.orm.em.getRepository(UserEntity);

  @UseRequestContext()
  async createUser(createUserDto: CreateUserDto) {
    //check if user already exists
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
       throw new RpcException(new ApolloError('User already exists'));
    }

    const user = new UserEntity();
    Object.assign(user, createUserDto);
    await this.userRepository.persist(user).flush();
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
  }

  @UseRequestContext()
  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new RpcException(new ApolloError(`User  not found`));
    }
    return user as UserResponse;
  }

  @UseRequestContext()
  async deleteUser(id: string) {
    const user = this.userRepository.getReference(id);
    if (!user) {
      throw new RpcException(new ApolloError(`User  not found`));
    }
    await this.userRepository.remove(user).flush();
    return true;
  }

  @UseRequestContext()
  async updateUser(updateUserDto: UpdateUserDto) {
    const ref = this.userRepository.getReference(updateUserDto.id);
    if (!ref) {
      throw new RpcException(new ApolloError(`User not found`));
    }
    Object.assign(ref, updateUserDto);
    await this.userRepository.flush();
    const { password, ...userWithoutPassword } = ref;
    return userWithoutPassword;
  }

  @UseRequestContext()
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user as UserResponse;
  }
}
