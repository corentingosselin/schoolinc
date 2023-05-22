import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@schoolinc/api-gateway/data-access';
import {
    UserEntity,
} from '@schoolinc/backend/user-service/data-access';
import { CreateUserDto, UserResponse } from '@schoolinc/shared/api-interfaces';

@Resolver(() => UserEntity)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto
  ): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }

  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
