-- Email signups table for capturing newsletter subscriptions
-- Run this in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS email_signups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  source TEXT,
  consent BOOLEAN NOT NULL DEFAULT true,
  ip TEXT,
  user_agent TEXT
);

-- Note: email is stored lowercased by the API before insert

-- If you already ran the old schema, run this instead to fix the constraint:
-- DROP INDEX IF EXISTS email_signups_email_unique_idx;
-- ALTER TABLE email_signups ADD CONSTRAINT email_signups_email_key UNIQUE (email);

-- RLS is disabled by default for this table since we're using service role key
-- No RLS policies needed - all inserts happen server-side with service role
