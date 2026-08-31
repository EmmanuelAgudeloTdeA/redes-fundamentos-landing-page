import { Router } from 'express';
import { getImageByTopic } from '../controllers/image.controller.js';

export const imageRouter = Router();

imageRouter.get('/:topic', getImageByTopic);
