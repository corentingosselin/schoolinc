import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = true): RmqOptions {
    const messageBrokerUri =
      this.configService.get<string>('MESSAGE_BROKER_URI');
    return {
      transport: Transport.RMQ,
      options: {
        urls: messageBrokerUri ? [messageBrokerUri] : undefined,
        queue: this.configService.get<string>(`MB_${queue}_QUEUE`),
        noAck,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }

  nack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.nack(originalMessage);
  }
}
