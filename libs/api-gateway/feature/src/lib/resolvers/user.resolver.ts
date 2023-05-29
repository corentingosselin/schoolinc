import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from '@schoolinc/api-gateway/data-access';
import { CurrentUser, JwtAuthGuard } from '@schoolinc/api-gateway/utils';
import {
  CreateUserDto,
  JwtUserSession,
  UpdateUserDto,
  UserResponse,
} from '@schoolinc/shared/api-interfaces';

@Resolver(() => UserResponse)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserResponse)
  async createUser(
    @Args('createUserDto') createUserDto: CreateUserDto
  ): Promise<UserResponse> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => UserResponse)
  async getUser(@CurrentUser() user: JwtUserSession) {
    return this.userService.findOne(user.sub);
  }

  @Mutation(() => UserResponse)
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('updateUserDto') updateUserDto: UpdateUserDto,
    @Context('req') req: any
  ) {
    const user = await req.user; // assuming the JWT payload includes the user ID
    updateUserDto.id = user.sub;
    return this.userService.update(updateUserDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Context('req') req: any) {
    const user = await req.user;
    const userId = user.sub;
    return this.userService.delete(userId);
  }
}
