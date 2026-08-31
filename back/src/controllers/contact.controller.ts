import type { NextFunction, Request, Response } from 'express';
import { insertContactMessage } from '../repositories/contactRepository.js';
import type { ContactMessageInput } from '../repositories/contactRepository.js';

export async function createContactMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const contactData = req.body as ContactMessageInput;
    const created = await insertContactMessage(contactData);
    res.status(201).json({ id: created.id, createdAt: created.createdAt.toISOString() });
  } catch (error) {
    next(error);
  }
}
