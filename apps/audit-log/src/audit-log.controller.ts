import { Controller, Get } from '@nestjs/common';
import { AuditLogService } from './audit-log.service';

@Controller()
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Get()
  getHello(): string {
    return this.auditLogService.getHello();
  }
}
