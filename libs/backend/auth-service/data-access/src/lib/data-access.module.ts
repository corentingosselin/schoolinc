import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SharedMessageBrokerModule } from '@schoolinc/shared/message-broker';
import { USER_SERVICE } from '@schoolinc/shared/api-interfaces';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [AuthService],
  exports: [AuthService],
  imports: [
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '30m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class BackendAuthServiceDataAccessModule {}
