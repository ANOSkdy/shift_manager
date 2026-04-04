import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnvConfig } from '@next/env';
import pg from 'pg';

const { Pool } = pg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.resolve(__dirname, '..');

loadEnvConfig(projectDir);

const connectionString = process.env.DATABASE_URL ?? process.env.NEON_DATABASE_URL;
if (!connectionString) {
  console.error('MISSING_DATABASE_URL');
  process.exit(1);
}

const pool = new Pool({ connectionString });

async function ensureMigrationsTable() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
}

async function readMigrationFiles() {
  const migrationsDir = path.join(projectDir, 'migrations');
  const entries = await fs.readdir(migrationsDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.sql'))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function run() {
  await ensureMigrationsTable();

  const files = await readMigrationFiles();
  const applied = await pool.query('SELECT filename FROM schema_migrations');
  const appliedSet = new Set(applied.rows.map((row) => row.filename));

  for (const filename of files) {
    if (appliedSet.has(filename)) {
      continue;
    }

    const migrationSql = await fs.readFile(path.join(projectDir, 'migrations', filename), 'utf8');
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      await client.query(migrationSql);
      await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [filename]);
      await client.query('COMMIT');
      console.log(`Applied migration: ${filename}`);
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  console.log('Migration run complete.');
}

run()
  .catch((error) => {
    console.error('Migration failed.');
    console.error(error instanceof Error ? error.message : 'Unknown error');
    process.exitCode = 1;
  })
  .finally(async () => {
    await pool.end();
  });
