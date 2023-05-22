import { Module } from '@nestjs/common';
import { BackendAuthServiceDataAccessModule } from '@schoolinc/backend/auth-service/data-access';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    BackendAuthServiceDataAccessModule,
    SharedMessageBrokerModule
  ],
})
export class BackendAuthServiceFeatureModule {}
