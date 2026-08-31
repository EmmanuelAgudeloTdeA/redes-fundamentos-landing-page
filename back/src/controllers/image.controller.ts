import type { NextFunction, Request, Response } from 'express';
import { findImageByTopic } from '../repositories/imageRepository.js';
import { createImageStorageService } from '../storage/index.js';

const imageStorageService = createImageStorageService();

export async function getImageByTopic(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const topic = req.params.topic as string;
    const image = await findImageByTopic(topic);

    if (!image) {
      res.status(404).json({ message: `No image found for topic "${topic}"` });
      return;
    }

    const imageStream = await imageStorageService.getImageStream(image.remotePath);
    res.setHeader('Content-Type', image.contentType);
    imageStream.on('error', next);
    imageStream.pipe(res);
  } catch (error) {
    next(error);
  }
}
