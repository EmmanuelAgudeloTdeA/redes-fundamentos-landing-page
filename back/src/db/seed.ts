import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/database.js';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const seedsDirectory = path.join(currentDirectory, 'seeds');

async function runSeeds(): Promise<void> {
  const seedFiles = (await readdir(seedsDirectory)).filter((file) => file.endsWith('.sql')).sort();

  for (const fileName of seedFiles) {
    const sql = await readFile(path.join(seedsDirectory, fileName), 'utf-8');
    console.log(`Applying seed: ${fileName}`);
    await pool.query(sql);
  }

  console.log('Seeding complete.');
  await pool.end();
}

runSeeds().catch((error: unknown) => {
  console.error('Seeding failed:', error);
  process.exit(1);
});
