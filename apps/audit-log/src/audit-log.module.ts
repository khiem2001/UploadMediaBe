import { Module } from '@nestjs/common';
import { AuditLogController } from './audit-log.controller';
import { AuditLogService } from './audit-log.service';

@Module({
  imports: [],
  controllers: [AuditLogController],
  providers: [AuditLogService],
})
export class AuditLogModule {}
