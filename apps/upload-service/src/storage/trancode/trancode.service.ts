import { Injectable } from '@nestjs/common';
import { MediaTranscodeRepository } from './trancode.repository';
import { MediaTranscodeEntity } from '@app/core/entitys/media-transcode.entity';
import { MediaTranscodeStatus } from '@app/core';

@Injectable()
export class TrancodeService {
  constructor(private transcodeRepository: MediaTranscodeRepository) {}

  async createMediaTranscode(transcode: any, media: any) {
    if (transcode) {
      await this.transcodeRepository.deleteMany({
        mediaId: media._id,
      });
      const listMediaTranscodeNew = [];

      const packs = transcode.packs
        ? transcode.packs.map((pack) => pack.value)
        : [];

      if (transcode.frames && transcode.frames.length > 0) {
        transcode.frames.map((f) => {
          packs.map((format) => {
            const mediaTranscodeNew = new MediaTranscodeEntity({
              mediaId: media._id,
              name: f.name,
              bitrate: f.bitrate,
              resolution: f.resolution,
              isActiveLogo: transcode.isActiveLogo,
              encode: (transcode.encode && transcode.encode.value) || 'NO',
              encodeName: (transcode.encode && transcode.encode.name) || 'No',
              status: MediaTranscodeStatus.WAITING,
              format,
            });
            mediaTranscodeNew.mediaId = media._id;
            listMediaTranscodeNew.push(mediaTranscodeNew);
          });
        });
      }

      return await this.transcodeRepository.save(listMediaTranscodeNew);
    }
  }
}
