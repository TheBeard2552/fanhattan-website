-- Run this in Supabase SQL Editor if you already created the table with the old schema
-- This fixes the upsert conflict target so the API works correctly

DROP INDEX IF EXISTS email_signups_email_unique_idx;
ALTER TABLE email_signups ADD CONSTRAINT email_signups_email_key UNIQUE (email);
