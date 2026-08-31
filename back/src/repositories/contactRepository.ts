import type { ResultSetHeader } from 'mysql2';
import { pool } from '../config/database.js';

export interface ContactMessageInput {
  fullName: string;
  email: string;
  message: string;
}

export interface ContactMessageCreated {
  id: number;
  createdAt: Date;
}

export async function insertContactMessage(data: ContactMessageInput): Promise<ContactMessageCreated> {
  const [result] = await pool.query<ResultSetHeader>(
    'INSERT INTO contact_messages (full_name, email, message) VALUES (?, ?, ?)',
    [data.fullName, data.email, data.message],
  );

  return { id: result.insertId, createdAt: new Date() };
}
