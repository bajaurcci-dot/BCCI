-- Make email column nullable in registrations table
ALTER TABLE registrations ALTER COLUMN email DROP NOT NULL;
