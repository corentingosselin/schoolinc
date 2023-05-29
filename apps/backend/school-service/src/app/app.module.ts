import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BackendSchoolServiceCoreModule } from '@schoolinc/backend/school-service/core';

@Module({
  imports: [
    BackendSchoolServiceCoreModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
