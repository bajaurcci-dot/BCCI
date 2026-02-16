-- Add NTN column to registrations table
ALTER TABLE registrations ADD COLUMN IF NOT EXISTS ntn text;
