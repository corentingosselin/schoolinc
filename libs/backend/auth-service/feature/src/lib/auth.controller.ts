import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@schoolinc/api-gateway/data-access';
import { CreateUserDto, LoginUserDto } from '@schoolinc/shared/api-interfaces';
import { LOGIN_CMD, REGISTER_CMD } from '@schoolinc/shared/message-broker';



@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @MessagePattern(REGISTER_CMD)
  register(@Payload() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern(LOGIN_CMD)
  async login(@Payload() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

}
