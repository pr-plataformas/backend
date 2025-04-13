import { Controller, Get } from '@nestjs/common';
import {
  HealthCheckService,
  HttpHealthIndicator,
  HealthCheck,
  MicroserviceHealthIndicator,
} from '@nestjs/terminus';
import { Transport } from '@nestjs/microservices';

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
    private microservice: MicroserviceHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      // Basic API check
      () => ({ api: { status: 'up' } }),

      // Check microservices via rabbit
      () =>
        this.microservice.pingCheck('rabbitmq', {
          transport: Transport.RMQ,
          options: {
            urls: [
              `amqp://${process.env.AMQP_USER}:${process.env.AMQP_PASSWORD}@${process.env.AMQP_HOST}:${process.env.AMQP_PORT}`,
            ],
          },
        }),

      // Check if microservices are responding (if they have health endpoints)
      // () => this.http.pingCheck('users-service', 'http://ms-users-vialidad:3000/health'),
      // () => this.http.pingCheck('tasks-service', 'http://ms-tasks-vialidad:3000/health'),
    ]);
  }
}
