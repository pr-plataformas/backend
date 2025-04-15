import * as compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/time-out.interceptor';
import config from './config/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger('Main');

  const configService = app.get<ConfigType<typeof config>>(config.KEY);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: false,
    }),
  );
  app.useGlobalInterceptors(new TimeoutInterceptor(5000));

  app.setGlobalPrefix('api/v1');

  app.enableCors();

  app.use(helmet({}));

  app.use(compression());

  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutos
  //     max: 100, // Limita cada IP a 100 solicitudes por ventana de 15 minutos
  //   }),
  // );

  // Protección contra ataques XSS
  app.use((req, res, next) => {
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
  });

  // Protección contra ataques de clickjacking
  app.use((req, res, next) => {
    res.setHeader('X-Frame-Options', 'DENY');
    next();
  });

  // Protección contra ataques de inyección de código
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });

  // Protección contra ataques de fuerza bruta
  app.use((req, res, next) => {
    res.setHeader(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains',
    );
    next();
  });

  const options = new DocumentBuilder()
    .setTitle('API Videoteca enfermería')
    .setDescription(
      'App para la gestión manuales de procedimientos en enfermería',
    )
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api/docs', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(configService.app.port);

  logger.log(
    `${process.env.NODE_ENV === 'production' ? 'Production' : 'Development'} enviroment started successfully`,
  );
}

bootstrap();
