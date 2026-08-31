import path from 'node:path';
import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { apiRouter } from './routes/index.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const app = express();

// In production the compiled frontend is copied into `public/` next to this
// server so a single Node process can serve both the site and the API —
// this avoids needing a separate reverse proxy (e.g. IIS/ARR) on the deploy target.
const staticFilesDirectory = path.join(process.cwd(), 'public');

app.use(cors({ origin: env.corsOrigin }));
app.use(express.json());
app.use(express.static(staticFilesDirectory));
app.use('/api', apiRouter);
app.use(errorHandler);
