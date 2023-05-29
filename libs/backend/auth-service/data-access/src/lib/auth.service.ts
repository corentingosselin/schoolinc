import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { UserEntity } from '@schoolinc/backend/user-service/data-access';
import { USER_SERVICE, LoginUserDto, UserSessionResponse, JwtUserSession, UserResponse } from '@schoolinc/shared/api-interfaces';
import { FIND_USER_BY_EMAIL } from '@schoolinc/shared/message-broker';
import { RpcService } from '@schoolinc/shared/network';
import { UserInputError } from 'apollo-server-express';
import { verify } from 'argon2';

@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    private readonly jwtService: JwtService
  ) {
    this.rpcService = new RpcService(this.userService);
  }

  async validateUser(loginDto: LoginUserDto): Promise<UserResponse | null> {
    const user = await this.rpcService.sendWithRpcExceptionHandler<UserEntity>(
      FIND_USER_BY_EMAIL,
      loginDto.email
    );
    if (user && (await verify(user.password, loginDto.password))) {
      return user as UserResponse;
    }
    return null;
  }

  async generateJwtToken(
    user: UserResponse
  ): Promise<UserSessionResponse> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
    } as JwtUserSession;
    return {
      token: this.jwtService.sign(payload),
      user,
    } as UserSessionResponse;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new RpcException(
        new UserInputError('Invalid email or password.')
      );
    }
    return this.generateJwtToken(user);
  }
}
