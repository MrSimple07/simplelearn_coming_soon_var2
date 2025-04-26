/*
  # Create waitlist table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `signup_method` (text, either 'email' or 'telegram')
      - `signup_date` (timestamp)
      - `telegram_data` (jsonb, nullable)
  
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for admins to read all data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  signup_method text NOT NULL CHECK (signup_method IN ('email', 'telegram')),
  signup_date timestamptz DEFAULT now(),
  telegram_data jsonb
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert to all users"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow read to authenticated users only"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);