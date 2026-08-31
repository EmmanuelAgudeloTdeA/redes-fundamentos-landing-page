import type { Readable } from 'node:stream';

/**
 * Abstracts where image files physically live so the rest of the backend
 * never depends on FTP or filesystem details directly.
 */
export interface ImageStorageService {
  getImageStream(remotePath: string): Promise<Readable>;
}
