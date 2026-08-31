import { Router } from 'express';
import { imageRouter } from './image.routes.js';
import { contactRouter } from './contact.routes.js';

export const apiRouter = Router();

apiRouter.get('/health', (_req, res) => res.json({ status: 'ok' }));
apiRouter.use('/images', imageRouter);
apiRouter.use('/contact', contactRouter);
