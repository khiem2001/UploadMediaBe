import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NatsOptions, Transport } from '@nestjs/microservices';
import {
  HttpException,
  HttpStatus,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import session from 'express-session';
import { ConfigService } from '@nestjs/config';
import companion = require('@uppy/companion');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bodyParser: true,
  });
  app.connectMicroservice<NatsOptions>({
    transport: Transport.NATS,
    options: {
      url: 'nats://localhost:4222',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        if (errors.length > 0) {
          const constraints = errors[0].constraints;
          const messageError = Object.values(constraints)[0];
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: messageError,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    }),
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  // app.use(
  //   session({
  //     secret: 'my-secret',
  //     resave: false,
  //     saveUninitialized: false,
  //   }),
  // );
  const configService = app.get(ConfigService);
  const port = configService.get('UPLOAD_PORT') || 5001;
  await app.startAllMicroservicesAsync();
  const server = await app.listen(port, () => {
    Logger.log(`Server on http://localhost:${port}/`);
  });
  companion.socket(server);
}
bootstrap();
