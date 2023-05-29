import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from '@schoolinc/api-gateway/data-access';
import { LoginUserDto, UserSessionResponse } from '@schoolinc/shared/api-interfaces';

@Resolver(() => UserSessionResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserSessionResponse)
  async loginUser(
    @Args('loginUserDto') loginUserDto: LoginUserDto
  ) {
    const user = await this.authService.login(loginUserDto);
    return user;
  }

  @Query(() => String)
  test(): string {
    return 'Hello World!';
  }


}
