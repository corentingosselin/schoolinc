import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BackendSchoolServiceFeatureModule } from '@schoolinc/backend/school-service/feature';
import mikroOrmConfig from '../mikro-orm.config';

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
    BackendSchoolServiceFeatureModule
  ]
})
export class BackendSchoolServiceCoreModule {}
