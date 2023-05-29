import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import {
  CreateUserDto,
  USER_SERVICE,
  UpdateUserDto,
  UserResponse,
} from '@schoolinc/shared/api-interfaces';
import {
  CREATE_USER_CMD,
  DELETE_USER_CMD,
  GET_USER_CMD,
  UPDATE_USER_CMD,
} from '@schoolinc/shared/message-broker';
import { RpcService } from '@schoolinc/shared/network';
import { IService } from '../service.interface';

@Injectable()
export class UserService implements IService<UserResponse, CreateUserDto> {
  private readonly rpcService: RpcService;
  constructor(@Inject(USER_SERVICE) private readonly userService: ClientProxy) {
    this.rpcService = new RpcService(this.userService);
  }

  create(createUserDto: CreateUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
      CREATE_USER_CMD,
      createUserDto
    );
  }

  async findOne(id: string) {
    const userReponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
      GET_USER_CMD,
      id
    );
    return userReponse;
  }

  delete(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_USER_CMD,
      id
    );
  }

  update(updateUserDto: UpdateUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
      UPDATE_USER_CMD,
      updateUserDto
    );
  }

  findAll(): Promise<UserResponse[]> {
    throw new Error('Method not implemented.');
  }
}
