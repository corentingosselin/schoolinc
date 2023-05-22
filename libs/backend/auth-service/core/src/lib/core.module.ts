import { Module } from '@nestjs/common';
import { BackendAuthServiceFeatureModule } from '@schoolinc/backend/auth-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    BackendAuthServiceFeatureModule
  ],
})
export class BackendAuthServiceCoreModule {}
