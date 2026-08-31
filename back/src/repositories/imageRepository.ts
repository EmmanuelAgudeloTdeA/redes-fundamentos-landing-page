import type { RowDataPacket } from 'mysql2';
import { pool } from '../config/database.js';

export interface ImageRecord {
  remotePath: string;
  contentType: string;
  altText: string;
}

interface ImageRow extends RowDataPacket {
  remotePath: string;
  contentType: string;
  altText: string;
}

export async function findImageByTopic(topic: string): Promise<ImageRecord | null> {
  const [rows] = await pool.query<ImageRow[]>(
    'SELECT remote_path AS remotePath, content_type AS contentType, alt_text AS altText FROM images WHERE topic = ? LIMIT 1',
    [topic],
  );

  return rows[0] ?? null;
}
