/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MessageBrokerService } from '@schoolinc/shared/message-broker';
import { USER_SERVICE } from '@schoolinc/shared/api-interfaces';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const msgBrokerService = app.get(MessageBrokerService);
  app.connectMicroservice(msgBrokerService.getOptions(USER_SERVICE));
  await app.startAllMicroservices();
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
      stopAtFirstError: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = config.get('USER_SERVICE_PORT') || 3200;
  await app.listen(port);
  Logger.log(
    `🚀 User service is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
