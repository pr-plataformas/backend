import compression from 'compression';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { TimeoutInterceptor } from './common/interceptors/time-out.interceptor';
import config from './config/config';
import { getMetadataArgsStorage } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: true });

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

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalInterceptors(new TimeoutInterceptor(300000));

  app.setGlobalPrefix('api/v1');

  app.enableCors();

  app.use(helmet({}));

  app.use(compression());

  // Limita cada IP a 100 solicitudes por ventana de 15 minutos
  // app.use(
  //   rateLimit({
  //     windowMs: 15 * 60 * 1000, // 15 minutos
  //     max: 100,
  //   }),
  // );

  // Extend timeout for file uploads
  // app.use((req, res, next) => {
  //   if (req.url?.includes('/videos/upload')) {
  //     res.setTimeout(300000); // 5 minutes
  //   }
  //   next();
  // });

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

  app.use((req, res, next) => {
    res.setHeader('Accept', 'multipart/form-data');
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
  console.log('Entidades detectadas por TypeORM:');
  console.log(getMetadataArgsStorage().tables.map((t) => t.name));
}

bootstrap();
