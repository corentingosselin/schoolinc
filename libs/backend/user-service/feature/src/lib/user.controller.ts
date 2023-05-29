import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from '@schoolinc/backend/user-service/data-access';
import { CreateUserDto, UpdateUserDto } from '@schoolinc/shared/api-interfaces';
import {
  CREATE_USER_CMD, DELETE_USER_CMD, FIND_USER_BY_EMAIL, FIND_USER_BY_ID, FIND_USER_BY_IDS, GET_USER_CMD, UPDATE_USER_CMD
} from '@schoolinc/shared/message-broker';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern(CREATE_USER_CMD)
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern(UPDATE_USER_CMD)
  updateUser(@Payload() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(updateUserDto);
  }

  @MessagePattern(GET_USER_CMD)
  getUser(@Payload() id: string) {
    return this.userService.getUser(id);
  }
  

  @MessagePattern(DELETE_USER_CMD)
  deleteUser(@Payload() id: string) {
    return this.userService.deleteUser(id);
  }

  @MessagePattern(FIND_USER_BY_EMAIL)
  findUserByEmail(@Payload() email: string) {
    return this.userService.findUserByEmail(email);
  }

  @MessagePattern(FIND_USER_BY_IDS)
  findUserByIds(@Payload() ids: string[]) {
    return this.userService.findUsers(ids);
  }

  @MessagePattern(FIND_USER_BY_ID)
  findUserById(@Payload() id: string) {
    return this.userService.findUserById(id);
  }
  
  
}
