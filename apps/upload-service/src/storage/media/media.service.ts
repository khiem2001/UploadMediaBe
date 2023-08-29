import { Injectable } from '@nestjs/common';
import {
  FileStorageRepository,
  FingerPrintRepository,
  MediaRepository,
} from './media.repository';
import { FileStorageEntity, FingerPrintEntity } from '@app/core';
import { IdCustom } from '@app/core/dtos';
import { TrancodeService } from '../trancode/trancode.service';

@Injectable()
export class MediaService {
  private transcode: any = [
    {
      _id: '64d9ac7a130a0e2ac0816822',
      isActiveLogo: 'ACTIVE',
      isDefault: true,
      name: 'trancode fomat',
      description: 'trancode my',
      packIds: ['64d99537130a0e2ac081681b', '64d9956e130a0e2ac081681c'],
      framesIds: ['64d99754130a0e2ac081681d'],
      projectId: '64d5a5ab5e94145c74c31348',
      encodeId: '64d9aba1130a0e2ac0816820',
    },
  ];

  private packs = [
    {
      _id: '64d99537130a0e2ac081681b',
      name: 'Dash',
      value: 'Dash',
    },
    {
      _id: '64d9956e130a0e2ac081681c',
      name: 'Hls',
      value: 'Hls',
    },
  ];

  private frame = [
    {
      _id: '64d99754130a0e2ac081681d',
      name: '1080p',
      resolution: 1080,
      bitrate: '3500000',
    },
    {
      _id: '64d99797130a0e2ac081681e',
      name: '720p',
      resolution: 720,
      bitrate: '2300000',
    },
    {
      _id: '64d997bd130a0e2ac081681f',
      name: '480p',
      resolution: 480,
      bitrate: '1200000',
    },
  ];

  private encode = [
    {
      _id: '64d9aba1130a0e2ac0816820',
      name: 'h265',
      value: '265',
    },
    {
      _id: '64d9abbe130a0e2ac0816821',
      name: 'h264',
      value: '264',
    },
  ];

  private access_control = [
    {
      _id: '64d9f63e02c3d0014c3260bc',
      isActive: 'ACTIVE',
      isDefault: true,
      name: 'Cấu hình của tôi',
      description: 'Mô tả',
      projectId: '64d5a5ab5e94145c74c31348',
      actionTakenCountry: 'ALLOW_ALL',
      actionTakenIp: 'ALLOW_ALL',
    },
  ];

  constructor(
    private readonly fingerPrintRepository: FingerPrintRepository,
    private readonly fileStorageRepository: FileStorageRepository,
    private readonly mediaFileRepository: MediaRepository,
    private readonly trancodeService: TrancodeService,
  ) {}

  //FINGER_PRINT
  async getFingerPrintByFingerID(fingerID: string) {
    return await this.fingerPrintRepository.findOne({
      where: {
        fingerPrintId: {
          $eq: fingerID,
        },
      },
    });
  }

  async createFingerPrint(data: any) {
    return await this.fingerPrintRepository.save(new FingerPrintEntity(data));
  }

  //MEDIA_FILES
  async updateMediaStorage(payload: any) {
    const mediaFile = await this.mediaFileRepository.findById(payload.mediaId);
    const _storageId = new IdCustom({
      id: payload.storageId,
    });

    const media = this.mediaFileRepository.save({
      ...mediaFile,
      storageId: _storageId.id,
    });
    return media;
  }

  async createMediaFile(data: any, header: any) {
    const newMedia = await this.mediaFileRepository.save({
      ...data,
      transcodeId: this.transcode[0]._id,
      accessControlId: this.access_control[0]._id,
    });

    this.transcode.forEach((profile) => {
      profile.packs = profile.packIds.map((packId) =>
        this.findPackById(packId),
      );
      profile.frames = profile.framesIds.map((frameId) =>
        this.findFrameById(frameId),
      );

      delete profile.packIds;
      delete profile.framesIds;
    });
    await this.trancodeService.createMediaTranscode(
      this.transcode[0],
      newMedia,
    );
  }

  //FILE_STORAGE
  async createFileStorage(input: any) {
    return await this.fileStorageRepository.save(new FileStorageEntity(input));
  }

  //COMMON
  findPackById(packId) {
    return this.packs.find((pack) => pack._id === packId);
  }

  findFrameById(frameId) {
    return this.frame.find((frame) => frame._id === frameId);
  }
}
