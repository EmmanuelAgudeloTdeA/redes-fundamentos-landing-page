import { Client } from 'basic-ftp';
import { PassThrough } from 'node:stream';
import type { Readable } from 'node:stream';
import type { ImageStorageService } from './ImageStorageService.js';
import { env } from '../config/env.js';

/**
 * Reads images from the university FTP server. The image bytes are streamed
 * directly to the caller instead of being buffered fully in memory.
 */
export class FtpImageStorageService implements ImageStorageService {
  async getImageStream(remotePath: string): Promise<Readable> {
    const client = new Client();
    const outputStream = new PassThrough();

    await client.access({
      host: env.ftp.host,
      port: env.ftp.port,
      user: env.ftp.user,
      password: env.ftp.password,
      secure: env.ftp.secure,
    });

    const fullPath = `${env.ftp.baseDirectory}/${remotePath}`.replace(/\/+/g, '/');

    client
      .downloadTo(outputStream, fullPath)
      .catch((error: unknown) => outputStream.destroy(error as Error))
      .finally(() => client.close());

    return outputStream;
  }
}
