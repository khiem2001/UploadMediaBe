import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { UserInputError } from 'apollo-server-express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import { setupBullBoard } from '@app/utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        if (errors.length > 0) {
          throw new UserInputError(`Form Arguments invalid`, {
            invalidArgs: errors.map((err) => {
              if (err.children.length) {
                return err.children.map((e) => {
                  if (e.children.length) {
                    return e.children.map((e2) => {
                      return {
                        invalidArg: e2.property,
                        constraints: e2.constraints,
                      };
                    });
                  }
                  return {
                    invalidArg: e.property,
                    constraints: e.constraints,
                  };
                });
              }
              return {
                invalidArg: err.property,
                constraints: err.constraints,
              };
            }),
          });
        }
      },
    }),
  );
  // // NOTE: rateLimit
  // app.use(
  //   rateLimit({
  //     windowMs: 1 * 60 * 1000, // 1 min
  //     max: 100, // limit each IP to 100 requests per windowMs
  //     message:
  //       '⚠️  Too many request created from this IP, please try again after an hour',
  //   }),
  // );

  // app.use(helmet());

  const configService = app.get(ConfigService);
  const port: string = configService.get<string>('GATEWAY_PORT') || '4000';

  setupBullBoard(app);

  await app.listen(port, () => {
    Logger.log(`Server on http://localhost:${port}/graphql`);
  });
}
bootstrap();
