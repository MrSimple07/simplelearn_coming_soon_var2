-- Add payment-related columns to waitlist table
ALTER TABLE waitlist
ADD COLUMN payment_status text CHECK (payment_status IN ('pending', 'completed', 'refunded')),
ADD COLUMN payment_id text,
ADD COLUMN payment_date timestamptz,
ADD COLUMN feedback_data jsonb;

-- Create index for payment_id
CREATE INDEX IF NOT EXISTS idx_waitlist_payment_id ON waitlist(payment_id);

-- Update RLS policies
DROP POLICY IF EXISTS "Allow insert to all users" ON waitlist;
CREATE POLICY "Allow insert to all users"
  ON waitlist
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow read to authenticated users only" ON waitlist;
CREATE POLICY "Allow read to authenticated users only"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);

-- Add policy for updating payment status
CREATE POLICY "Allow update payment status"
  ON waitlist
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true); 