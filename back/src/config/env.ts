import 'dotenv/config';

function requireEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export const env = {
  port: Number(requireEnv('PORT', '4000')),
  corsOrigin: requireEnv('CORS_ORIGIN', 'http://localhost:5173'),

  db: {
    host: requireEnv('DB_HOST', 'localhost'),
    port: Number(requireEnv('DB_PORT', '3306')),
    user: requireEnv('DB_USER', 'root'),
    password: requireEnv('DB_PASSWORD', ''),
    database: requireEnv('DB_NAME', 'networking_landing'),
  },

  storageDriver: requireEnv('STORAGE_DRIVER', 'local') as 'local' | 'ftp',

  localStorage: {
    directory: requireEnv('LOCAL_STORAGE_DIR', 'storage'),
  },

  ftp: {
    host: process.env.FTP_HOST ?? '',
    port: Number(process.env.FTP_PORT ?? '21'),
    user: process.env.FTP_USER ?? '',
    password: process.env.FTP_PASSWORD ?? '',
    secure: process.env.FTP_SECURE === 'true',
    baseDirectory: process.env.FTP_BASE_DIR ?? '/',
  },
};
