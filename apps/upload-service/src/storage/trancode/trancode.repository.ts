import { BaseRepository } from '@app/core';
import { MediaTranscodeEntity } from '@app/core/entitys/media-transcode.entity';
import { EntityRepository } from 'typeorm';

@EntityRepository(MediaTranscodeEntity)
export class MediaTranscodeRepository extends BaseRepository<MediaTranscodeEntity> {}
