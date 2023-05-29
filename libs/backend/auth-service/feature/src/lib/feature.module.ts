import { Module } from '@nestjs/common';
import { BackendAuthServiceDataAccessModule } from '@schoolinc/backend/auth-service/data-access';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { AuthController } from './auth.controller';

@Module({
  controllers: [AuthController],
  providers: [],
  exports: [],
  imports: [
    BackendAuthServiceDataAccessModule,
    SharedMessageBrokerModule
  ],
})
export class BackendAuthServiceFeatureModule {}
