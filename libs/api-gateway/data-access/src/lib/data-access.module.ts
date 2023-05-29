import { Module } from '@nestjs/common';
import { AUTH_SERVICE, SCHOOL_SERVICE, USER_SERVICE } from '@schoolinc/shared/api-interfaces';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';
import { ClassService } from './services/class.service';
import { GradeService } from './services/grade.service';

@Module({
  controllers: [],
  providers: [UserService, AuthService, ClassService, GradeService],
  exports: [UserService, AuthService, ClassService, GradeService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: AUTH_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
    SharedMessageBrokerModule.registerClient({
      name: SCHOOL_SERVICE,
    }),
  ],
})
export class ApiGatewayDataAccessModule {}
