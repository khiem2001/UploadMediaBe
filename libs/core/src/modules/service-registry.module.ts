import { Module, Global, CacheModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CacheStoreConfigService } from '../services/cache-store-config.service';
// import {
//   CreatedContentListener,
//   LoginEventListener,
//   DeletedContentListener,
//   UpdatedContentListener,
//   LogoutEventListener,
//   ApproveContentListener,
//   RejectContentListener,
//   ConnectContentListener,
//   DisConnectContentListener,
// } from '../listeners';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
    EventEmitterModule.forRoot(),
    ClientsModule.register([
      {
        name: 'AUDIT_LOG_SERVICE',
        transport: Transport.NATS,
        options: {
          url: process.env.NATS_URL || 'nats://localhost:4222',
        },
      },
    ]),
  ],
  exports: [
    CacheModule.registerAsync({
      useClass: CacheStoreConfigService,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [
    // CreatedContentListener,
    // LoginEventListener,
    // LogoutEventListener,
    // DeletedContentListener,
    // UpdatedContentListener,
    // ApproveContentListener,
    // RejectContentListener,
    // ConnectContentListener,
    // DisConnectContentListener,
  ],
})
export class ServiceRegistryModule {}
