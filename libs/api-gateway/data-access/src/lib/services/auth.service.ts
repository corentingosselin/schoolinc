import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import {
  AUTH_SERVICE,
  LoginUserDto,
  UserSessionResponse,
} from '@schoolinc/shared/api-interfaces';
import { LOGIN_CMD } from '@schoolinc/shared/message-broker';
import { RpcService } from '@schoolinc/shared/network';

@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authentificationService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.authentificationService);
  }

  login(loginDto: LoginUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserSessionResponse>(
      LOGIN_CMD,
      loginDto
    );
  }

}
