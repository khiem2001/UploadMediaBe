import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { ServiceRegistryModule, TypeOrmConfigService } from '@app/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { StorageModule } from './storage/storage.module';

@Module({
  imports: [
    ServiceRegistryModule,
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    ServeStaticModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          rootPath: join(__dirname, '../../../', 'storage'),
          serveRoot: `/storage`,
          exclude: ['/api*'],
        },
      ],
    }),
    StorageModule,
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
