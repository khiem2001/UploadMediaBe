import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServiceRegistryModule } from '@app/core';
import { BullModule } from '@nestjs/bull';

@Global()
@Module({
  imports: [
    ServiceRegistryModule,
    BullModule.registerQueue({ name: 'ffmpeg' }),
    BullModule.registerQueue({ name: 'packager' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
