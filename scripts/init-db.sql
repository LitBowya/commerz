-- Initialize database for Commerz platform
-- This script runs when PostgreSQL container starts for the first time

-- Create additional databases for testing
CREATE DATABASE commerz_test;

-- Create extensions we'll need
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Switch to main database
\c commerz_dev;

-- Create extensions in main database
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- Create basic schema (detailed schema will be handled by Kysely migrations)
CREATE SCHEMA IF NOT EXISTS public;

-- Grant permissions
GRANT ALL PRIVILEGES ON DATABASE commerz_dev TO commerz_user;
GRANT ALL PRIVILEGES ON DATABASE commerz_test TO commerz_user;

-- Switch to test database and setup extensions
\c commerz_test;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

GRANT ALL PRIVILEGES ON SCHEMA public TO commerz_user;
