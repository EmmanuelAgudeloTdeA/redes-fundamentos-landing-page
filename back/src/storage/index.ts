import type { ImageStorageService } from './ImageStorageService.js';
import { FtpImageStorageService } from './FtpImageStorageService.js';
import { LocalImageStorageService } from './LocalImageStorageService.js';
import { env } from '../config/env.js';

export function createImageStorageService(): ImageStorageService {
  return env.storageDriver === 'ftp' ? new FtpImageStorageService() : new LocalImageStorageService();
}

export type { ImageStorageService };
