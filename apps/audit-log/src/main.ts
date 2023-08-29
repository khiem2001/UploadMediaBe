import { NestFactory } from '@nestjs/core';
import { AuditLogModule } from './audit-log.module';

async function bootstrap() {
  const app = await NestFactory.create(AuditLogModule);
  await app.listen(3000);
}
bootstrap();
