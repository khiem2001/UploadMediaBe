import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import {
  FileStorageEntity,
  FingerPrintEntity,
  MediaFileEntity,
} from '../entitys';
import { MediaTranscodeEntity } from '../entitys/media-transcode.entity';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: 'mongodb',
      url: this.config.get<string>('MONGODB_URI'),
      entities: [
        FingerPrintEntity,
        FileStorageEntity,
        MediaFileEntity,
        MediaTranscodeEntity,
      ],
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
    return options;
  }
}
