import { Router } from 'express';
import { createContactMessage } from '../controllers/contact.controller.js';
import { validateContactBody } from '../middlewares/validateContactBody.js';

export const contactRouter = Router();

contactRouter.post('/', validateContactBody, createContactMessage);
