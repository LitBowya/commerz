-- Migration script for initial system setup
-- This will be run manually or through a migration system

-- Create system health table for database connection testing
CREATE TABLE IF NOT EXISTS system_health (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) NOT NULL DEFAULT 'healthy',
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert initial health check record
INSERT INTO system_health (status) VALUES ('initialized') ON CONFLICT DO NOTHING;

-- Create basic indexes
CREATE INDEX IF NOT EXISTS idx_system_health_timestamp ON system_health(timestamp);

-- Enable Row Level Security (we'll configure policies later)
ALTER TABLE system_health ENABLE ROW LEVEL SECURITY;
