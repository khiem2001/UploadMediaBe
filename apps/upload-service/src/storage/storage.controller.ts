import {
  MediaFileMetadata,
  getCurrentTimeStamp,
  getExtensionByFileName,
  removeExFromFileName,
  validateImageFile,
  validateVideoFile,
} from '@app/utils';
import { All, Controller, Req, Res } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { MediaService } from './media/media.service';
import {
  FileType,
  MediaStatus,
  SocialSource,
  StorageStatus,
  UploadType,
} from '@app/core';
import { UploadService } from './upload.service';

@Controller()
export class StorageController {
  constructor(
    private mediaService: MediaService,
    private uploadService: UploadService,
  ) {}

  @All('upload/files')
  async createVideo(@Req() req, @Res() res: Response) {
    try {
      const headerMetadata = {
        userAgent: req.headers['user-agent'],
      };
      const uploadMeta: string = req.header('Upload-Metadata');
      const metadata = new MediaFileMetadata();

      uploadMeta.split(',').map((item) => {
        const tmp = item.split(' ');
        const key = tmp[0];
        const value = Buffer.from(tmp[1], 'base64').toString('utf8');
        metadata[`${key}`] = value;
      });

      const prefix: string = uuid();
      const currentTimestampInSeconds = getCurrentTimeStamp();
      const extension = getExtensionByFileName(metadata.filename);
      const fileName = `${prefix}_${currentTimestampInSeconds}` + extension;

      //Check fingerPrint
      const fingerPrint = await this.mediaService.getFingerPrintByFingerID(
        metadata.fingerPrint,
      );

      console.log('aaaaaaaa', metadata);

      if (!fingerPrint) {
        const fileStorage = await this.mediaService.createFileStorage({
          fileName,
          originalName: fileName,
          path: 'storage',
          status: StorageStatus.UPLOADING,
          mimeType: metadata.filetype,
          size: metadata.size,
        });

        const fingerPrint = await this.mediaService.createFingerPrint({
          fileName,
          fingerPrintId: metadata.fingerPrint,
          storageId: fileStorage._id,
        });

        req.fileUpload = { ...fileStorage, fingerPrintId: fingerPrint._id };

        let fileType;
        if (validateImageFile(metadata.filetype)) {
          fileType = FileType.IMAGE;
        } else if (validateVideoFile(metadata.filetype)) {
          fileType = FileType.VIDEO;
        } else {
          fileType = FileType.FILE;
        }

        if (metadata.mediaId) {
          await this.mediaService.updateMediaStorage({
            mediaId: metadata.mediaId,
            storageId: fileStorage._id,
          });
        } else {
          await this.mediaService.createMediaFile(
            {
              fileType,
              projectId: metadata.projectId,
              sourceType: SocialSource.UPLOAD,
              status: MediaStatus.DRAFT,
              storageId: fileStorage._id,
              title: removeExFromFileName(metadata.name),
              description: removeExFromFileName(metadata.name),
              uploadType: metadata.uploadType || UploadType.UPLOAD_FILE,
            },
            headerMetadata,
          );
        }
      } else {
        req.fileUpload = {
          fileName: fingerPrint.fileName,
          fingerPrintId: fingerPrint._id,
          projectId: metadata.projectId,
        };
      }
      // return await this.uploadService.handleUploadFile(req, res);
    } catch (err) {
      console.log(err);
    }
  }
}
