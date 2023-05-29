import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ApiGatewayDataAccessModule } from '@schoolinc/api-gateway/data-access';
import { JwtAuthService, ServiceFactory } from '@schoolinc/api-gateway/utils';
import { UserResolver } from './resolvers/user.resolver';
import { AuthResolver } from './resolvers/auth.resolver';
import { DateScalar } from '@schoolinc/shared/api-interfaces';
import { ClassResolver } from './resolvers/class.resolver';
import { GradeResolver } from './resolvers/grade.resolver';

@Module({
  controllers: [
  ],
  providers: [
    JwtAuthService,
    ServiceFactory,
    UserResolver,
    AuthResolver,
    ClassResolver,
    GradeResolver,
    DateScalar
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
