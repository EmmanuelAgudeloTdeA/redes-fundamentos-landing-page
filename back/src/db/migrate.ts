import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../config/database.js';
import type { RowDataPacket } from 'mysql2';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const migrationsDirectory = path.join(currentDirectory, 'migrations');

interface AppliedMigrationRow extends RowDataPacket {
  name: string;
}

async function ensureMigrationsTable(): Promise<void> {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
}

async function getAppliedMigrationNames(): Promise<Set<string>> {
  const [rows] = await pool.query<AppliedMigrationRow[]>('SELECT name FROM schema_migrations');
  return new Set(rows.map((row) => row.name));
}

async function runMigrations(): Promise<void> {
  await ensureMigrationsTable();
  const appliedNames = await getAppliedMigrationNames();

  const migrationFiles = (await readdir(migrationsDirectory)).filter((file) => file.endsWith('.sql')).sort();

  for (const fileName of migrationFiles) {
    if (appliedNames.has(fileName)) {
      continue;
    }

    const sql = await readFile(path.join(migrationsDirectory, fileName), 'utf-8');
    console.log(`Applying migration: ${fileName}`);
    await pool.query(sql);
    await pool.query('INSERT INTO schema_migrations (name) VALUES (?)', [fileName]);
  }

  console.log('Migrations up to date.');
  await pool.end();
}

runMigrations().catch((error: unknown) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
