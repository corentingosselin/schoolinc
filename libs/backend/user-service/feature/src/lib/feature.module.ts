import { Module } from '@nestjs/common';
import { BackendUserServiceDataAccessModule } from '@schoolinc/backend/user-service/data-access';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { UserController } from './user.controller';

@Module({
  controllers: [
    UserController
  ],
  providers: [],
  exports: [],
  imports: [
    BackendUserServiceDataAccessModule,
    SharedMessageBrokerModule
  ],
})
export class BackendUserServiceFeatureModule {}