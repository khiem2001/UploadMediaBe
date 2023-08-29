import { Injectable } from '@nestjs/common';

@Injectable()
export class AuditLogService {
  getHello(): string {
    return 'Hello World!';
  }
}
