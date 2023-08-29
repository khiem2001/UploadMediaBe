import { UploadType } from '@app/core';
import { HttpException, HttpStatus } from '@nestjs/common';
const path = require('path');

export class FileMetadata {
  public relativePath?: string;
  public name?: string;
  public type?: string;
  public filetype?: string;
  public filename?: string;
  public extension?: string;
  public size?: number;
}

export class MediaFileMetadata extends FileMetadata {
  public fingerPrint?: any;
  public transcodeId?: any;
  public projectId?: any;
  public mediaId?: string; // change storage
  public uploadType?: UploadType;
}

export const getExtensionByFileName = (fileName: string) => {
  return path.extname(fileName);
};
export const validateImageFile = (filetype: any): boolean => {
  const imageMime = process.env.MIME_TYPE_IMAGE.split(',');
  return imageMime.indexOf(filetype.toLowerCase()) !== -1 ? true : false;
};

export const validateVideoFile = (filetype: any): boolean => {
  const videoMime = process.env.MIME_TYPE_VIDEO.split(',');
  return videoMime.indexOf(filetype.toLowerCase()) !== -1 ? true : false;
};

export const validateFileUpload = (filetype: any): boolean => {
  const imageMime = process.env.MIME_TYPE_IMAGE.split(',');
  const videoMime = process.env.MIME_TYPE_VIDEO.split(',');
  const textMime = process.env.MIME_TYPE_TEXT.split(',');
  const allowMime = [...imageMime, ...videoMime, ...textMime];
  return allowMime.indexOf(filetype.toLowerCase()) !== -1 ? true : false;
};

export const removeExFromFileName = (str: string) => {
  return str.replace(/\.[^/.]+$/, '');
};

export const fileNameFromRequest = (req) => {
  if (!req.fileUpload && !req.fileUpload.fileName) {
    throw new HttpException(
      {
        status: HttpStatus.BAD_REQUEST,
        error: 'Bad request!',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
  return req.fileUpload.fileName;
};
