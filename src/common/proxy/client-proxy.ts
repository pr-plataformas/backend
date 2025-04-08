import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';

import { RabbitMQ } from '../constants';
import config from '../../config/config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class ClientProxyApp implements OnModuleDestroy {
  private readonly amqpUrl: string;
  private readonly logger: Logger;
  private readonly clientProxies: Map<string, ClientProxy> = new Map();

  constructor(
    @Inject(config.KEY)
    private readonly configService: ConfigType<typeof config>,
  ) {
    this.logger = new Logger('ClientGatewayProxy');
    const { user, password, host, port } = this.configService.rabbitMQ;
    this.amqpUrl = `amqp://${user}:${password}@${host}:${port}`;
  }

  getClientProxy(queueName: RabbitMQ): ClientProxy {
    if (!this.clientProxies.has(queueName)) {
      const proxy = ClientProxyFactory.create({
        transport: Transport.RMQ,
        options: {
          urls: [this.amqpUrl],
          queue: queueName,
        },
      });
      this.clientProxies.set(queueName, proxy);
    }
    this.logger.log(`${queueName} is ready`);
    return this.clientProxies.get(queueName);
  }

  async onModuleDestroy() {
    for (const proxy of this.clientProxies.values()) {
      await proxy.close();
    }
  }
}
