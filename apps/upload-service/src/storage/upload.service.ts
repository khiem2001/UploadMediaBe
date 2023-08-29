import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import tus = require('tus-node-server');
import { storageConfig } from '@app/core/common/config';
import { fileNameFromRequest } from '@app/utils';

@Injectable()
export class UploadService implements OnModuleInit {
  private logger = new Logger('TusService');
  private readonly tusServer = new tus.Server();

  constructor(@InjectQueue('ffmpeg') private _ffmpegQueue: Queue) {}
  onModuleInit() {
    this.initializeTusServer();
  }
  async handleUploadFile(req, res) {
    return await this.tusServer.handle(req, res);
  }

  private initializeTusServer() {
    this.logger.verbose(`Initializing Tus Server`);
    switch (storageConfig.storageDriver) {
      case 'local':
        this.tusServer.datastore = new tus.FileStore({
          path: '/storage',
          namingFunction: fileNameFromRequest,
        });
        break;
    }
  }
}
