-- Feedback System Schema
-- Run this in your Supabase SQL Editor

-- Create feedback_id_seq sequence for generating public IDs
CREATE SEQUENCE IF NOT EXISTS feedback_id_seq START WITH 1;

-- Create function to generate public_id like "FAN-0001"
CREATE OR REPLACE FUNCTION generate_feedback_public_id()
RETURNS TEXT AS $$
DECLARE
  next_id INTEGER;
  public_id TEXT;
BEGIN
  next_id := nextval('feedback_id_seq');
  public_id := 'FAN-' || LPAD(next_id::TEXT, 4, '0');
  RETURN public_id;
END;
$$ LANGUAGE plpgsql;

-- Create feedback table
CREATE TABLE IF NOT EXISTS feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  public_id TEXT UNIQUE NOT NULL DEFAULT generate_feedback_public_id(),
  type TEXT NOT NULL CHECK (type IN ('Bug', 'Feature', 'UX', 'Other')),
  district_slug TEXT,
  description TEXT NOT NULL,
  screenshot_path TEXT,
  screenshot_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  submit_ip TEXT,
  user_agent TEXT,
  discord_thread_id TEXT,
  discord_message_id TEXT,
  votes_want INTEGER DEFAULT 0,
  votes_must_have INTEGER DEFAULT 0,
  votes_bug INTEGER DEFAULT 0,
  votes_idea INTEGER DEFAULT 0,
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'under_review', 'planned', 'in_progress', 'completed', 'closed'))
);

-- Create indexes for common queries
CREATE INDEX IF NOT EXISTS idx_feedback_public_id ON feedback(public_id);
CREATE INDEX IF NOT EXISTS idx_feedback_type ON feedback(type);
CREATE INDEX IF NOT EXISTS idx_feedback_district_slug ON feedback(district_slug);
CREATE INDEX IF NOT EXISTS idx_feedback_created_at ON feedback(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_feedback_status ON feedback(status);
CREATE INDEX IF NOT EXISTS idx_feedback_discord_thread_id ON feedback(discord_thread_id);

-- Enable Row Level Security
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access to feedback"
  ON feedback
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow insert only (no updates or deletes from public)
CREATE POLICY "Allow public insert to feedback"
  ON feedback
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Grant necessary permissions
GRANT SELECT, INSERT ON feedback TO anon;
GRANT SELECT, INSERT ON feedback TO authenticated;
GRANT ALL ON feedback TO service_role;

-- Grant sequence permissions
GRANT USAGE ON SEQUENCE feedback_id_seq TO anon;
GRANT USAGE ON SEQUENCE feedback_id_seq TO authenticated;
GRANT USAGE ON SEQUENCE feedback_id_seq TO service_role;

-- Create storage bucket for feedback screenshots
-- Note: Run this in the Supabase Dashboard Storage section or via SQL:
INSERT INTO storage.buckets (id, name, public)
VALUES ('feedback_screenshots', 'feedback_screenshots', false)
ON CONFLICT (id) DO NOTHING;

-- Create storage policy for public read access to screenshots
CREATE POLICY "Allow public read access to feedback screenshots"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'feedback_screenshots');

-- Create storage policy for authenticated uploads
CREATE POLICY "Allow service role to upload feedback screenshots"
  ON storage.objects
  FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'feedback_screenshots');

-- Create storage policy for service role to update
CREATE POLICY "Allow service role to update feedback screenshots"
  ON storage.objects
  FOR UPDATE
  TO service_role
  USING (bucket_id = 'feedback_screenshots');
