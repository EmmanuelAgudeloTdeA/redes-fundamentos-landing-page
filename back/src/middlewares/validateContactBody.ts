import type { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const contactBodySchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  message: z.string().trim().min(10),
});

export function validateContactBody(req: Request, res: Response, next: NextFunction): void {
  const result = contactBodySchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({ message: 'Invalid contact form data' });
    return;
  }

  req.body = result.data;
  next();
}
