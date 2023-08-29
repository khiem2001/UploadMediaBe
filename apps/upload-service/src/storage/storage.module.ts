import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { MediaService } from './media/media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FileStorageRepository,
  FingerPrintRepository,
  MediaRepository,
} from './media/media.repository';
import { MediaTranscodeRepository } from './trancode/trancode.repository';
import { TrancodeService } from './trancode/trancode.service';
import { UploadService } from './upload.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FingerPrintRepository,
      FileStorageRepository,
      MediaRepository,
      MediaTranscodeRepository,
    ]),
    BullModule.registerQueue({ name: 'ffmpeg' }),
    BullModule.registerQueue({ name: 'packager' }),
  ],
  controllers: [StorageController],
  providers: [MediaService, TrancodeService, UploadService],
})
export class StorageModule {}
