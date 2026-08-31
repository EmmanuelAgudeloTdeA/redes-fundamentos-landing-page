import { createReadStream } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';
import type { Readable } from 'node:stream';
import type { ImageStorageService } from './ImageStorageService.js';
import { env } from '../config/env.js';

/**
 * Fallback storage used for local development before FTP credentials are
 * available. Reads image files from a local directory instead.
 */
export class LocalImageStorageService implements ImageStorageService {
  async getImageStream(remotePath: string): Promise<Readable> {
    const filePath = path.join(process.cwd(), env.localStorage.directory, remotePath);
    await access(filePath);
    return createReadStream(filePath);
  }
}
