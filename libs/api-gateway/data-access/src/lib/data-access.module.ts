import { Module } from '@nestjs/common';
import { AUTH_SERVICE, USER_SERVICE } from '@schoolinc/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { UserService } from './services/user.service';

@Module({
  controllers: [],
  providers: [UserService],
  exports: [UserService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: AUTH_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
  ],
})
export class ApiGatewayDataAccessModule {}
