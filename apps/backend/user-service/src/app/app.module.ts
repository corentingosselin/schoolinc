import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendUserServiceCoreModule } from '@schoolinc/backend/user-service/core';

@Module({
  imports: [
    BackendUserServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
