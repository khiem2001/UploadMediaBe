import { registerEnumType } from '@nestjs/graphql';

export enum UploadType {
  'UPLOAD_FILE' = 'UPLOAD_FILE',
  'UPLOAD_AVATAR' = 'UPLOAD_AVATAR',
  'UPLOAD_SUB_TITLE' = 'UPLOAD_SUB_TITLE',
  'UPLOAD_DOCS' = 'UPLOAD_DOCS',
}
export enum ResolutionType {
  'R_4320p' = 4320,
  'R_2880p' = 2880,
  'R_2160p' = 2160,
  'R_1440p' = 1440,
  'R_1080p' = 1080,
  'R_720p' = 720,
  'R_480p' = 480,
  'R_360p' = 260,
  'R_240p' = 240,
  'R_144p' = 144,
}
export enum StorageStatus {
  'WAITING' = 'WAITING',
  'UPLOADING' = 'UPLOADING',
  'UPLOADED' = 'UPLOADED',
  'ERROR' = 'ERROR',
  'READY' = 'READY',
}

export enum FileType {
  'VIDEO' = 'VIDEO',
  'IMAGE' = 'IMAGE',
  'FILE' = 'FILE',
}
export enum SocialSource {
  'FACEBOOK' = 'FACEBOOK',
  'YOUTUBE' = 'YOUTUBE',
  'FOLDER' = 'FOLDER',
  'UPLOAD' = 'UPLOAD',
  'OTHER' = 'OTHER',
}
export enum MediaStatus {
  'DRAFT' = 'DRAFT',
  'PUBLIC' = 'PUBLIC',
}
export enum MediaTranscodeStatus {
  'WAITING' = 'WAITING',
  'TRANSCODING' = 'TRANSCODING',
  'ERROR' = 'ERROR',
  'READY' = 'READY',
}
export enum IsActive {
  Active = 'ACTIVE',
  DeActive = 'DEACTIVE',
}

registerEnumType(MediaTranscodeStatus, { name: 'MediaTranscodeStatus' });
registerEnumType(MediaStatus, { name: 'MediaStatus' });
registerEnumType(SocialSource, { name: 'SocialSource' });
registerEnumType(FileType, { name: 'FileType' });
registerEnumType(StorageStatus, { name: 'StorageStatus' });
registerEnumType(ResolutionType, { name: 'ResolutionType' });
registerEnumType(UploadType, { name: 'UploadType' });
registerEnumType(IsActive, { name: 'IsActive' });
