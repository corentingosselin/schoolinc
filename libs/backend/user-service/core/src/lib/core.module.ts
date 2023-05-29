import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';
import { BackendUserServiceFeatureModule } from '@schoolinc/backend/user-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    MikroOrmModule.forRootAsync(
      {
        useFactory: () => ({
          registerRequestContext: false,
          debug: true,
          ...mikroOrmConfig
        }),
        inject: [],

    }),
    BackendUserServiceFeatureModule
  ],
})
export class BackendUserServiceCoreModule {}
