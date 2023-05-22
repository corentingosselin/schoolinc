import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendAuthServiceCoreModule } from '@schoolinc/backend/auth-service/core';

@Module({
  imports: [
    BackendAuthServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
