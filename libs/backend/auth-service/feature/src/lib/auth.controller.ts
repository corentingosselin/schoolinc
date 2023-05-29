import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthService } from '@schoolinc/backend/auth-service/data-access';
import { LoginUserDto } from '@schoolinc/shared/api-interfaces';
import { LOGIN_CMD } from '@schoolinc/shared/message-broker';



@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @MessagePattern(LOGIN_CMD)
  async login(@Payload() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

}
