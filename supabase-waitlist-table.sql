-- Run this in Supabase SQL Editor (same project as main app)
-- https://supabase.com/dashboard/project/obhpflwpreazsxsoydml/sql

CREATE TABLE IF NOT EXISTS waitlist (
  id         uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
  email      text        NOT NULL UNIQUE,
  source     text        DEFAULT 'landing',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to join the waitlist (public insert)
CREATE POLICY "public_insert" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Only service role can read the list (admin use only)
CREATE POLICY "service_role_select" ON waitlist
  FOR SELECT USING (auth.role() = 'service_role');
