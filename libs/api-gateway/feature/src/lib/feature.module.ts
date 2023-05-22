import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayDataAccessModule } from '@schoolinc/api-gateway/data-access';
import { JwtAuthService, ServiceFactory } from '@schoolinc/api-gateway/utils';
import { UserResolver } from './resolvers/user.resolver';

@Module({
  controllers: [
  ],
  providers: [
    JwtAuthService,
    ServiceFactory,
    UserResolver,
  ],
  exports: [],
  imports: [
    ApiGatewayDataAccessModule,
    JwtModule.register({
      secret: process.env['JWT_SECRET'],
      signOptions: { expiresIn: '30m' },
    })
  ],
})
export class ApiGatewayFeatureModule {}
