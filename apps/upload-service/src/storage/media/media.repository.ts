import {
  BaseRepository,
  FileStorageEntity,
  FingerPrintEntity,
  MediaFileEntity,
} from '@app/core';
import { EntityRepository } from 'typeorm';

@EntityRepository(FingerPrintEntity)
export class FingerPrintRepository extends BaseRepository<FingerPrintEntity> {}

@EntityRepository(FileStorageEntity)
export class FileStorageRepository extends BaseRepository<FileStorageEntity> {}

@EntityRepository(MediaFileEntity)
export class MediaRepository extends BaseRepository<MediaFileEntity> {}
