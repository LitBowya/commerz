import { Kysely, PostgresDialect } from 'kysely';
import { Pool } from 'pg';

// Database schema interfaces will be defined here
export interface Database {
  // Entity tables will be added as we implement them
  // For now, we'll add a simple health check table
  system_health: {
    id: number;
    status: string;
    timestamp: Date;
  };
}

// Database configuration
const dialect = new PostgresDialect({
  pool: new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USER || 'commerz_user',
    password: process.env.DB_PASSWORD || 'commerz_password',
    database: process.env.DB_NAME || 'commerz_dev',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  }),
});

// Create and export the database instance
export const db = new Kysely<Database>({
  dialect,
});

// Database connection helper
export async function connectDatabase(): Promise<void> {
  try {
    await db.selectFrom('system_health').selectAll().limit(1).execute();
    console.log('✅ Database connection established');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
}

// Graceful shutdown helper
export async function disconnectDatabase(): Promise<void> {
  try {
    await db.destroy();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
    throw error;
  }
}
