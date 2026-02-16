-- Create Downloads Table
CREATE TABLE IF NOT EXISTS downloads (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT,
    download_url TEXT,
    file_type TEXT NOT NULL, -- PDF, DOCX, XLSX, IMG, LINK
    size TEXT,
    is_published BOOLEAN DEFAULT true,
    downloads_count INTEGER DEFAULT 0,
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE downloads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'downloads' table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'downloads' AND policyname = 'Allow public read access'
    ) THEN
        CREATE POLICY "Allow public read access" ON downloads
        FOR SELECT USING (is_published = true);
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'downloads' AND policyname = 'Allow admin to manage downloads'
    ) THEN
        CREATE POLICY "Allow admin to manage downloads" ON downloads
        FOR ALL USING (
            (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
        );
    END IF;
END
$$;

-- Create Storage Bucket for Downloads
INSERT INTO storage.buckets (id, name, public)
VALUES ('downloads', 'downloads', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'downloads' bucket
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow admin to upload downloads'
    ) THEN
        CREATE POLICY "Allow admin to upload downloads" ON storage.objects
        FOR INSERT TO authenticated
        WITH CHECK (
            bucket_id = 'downloads' AND
            (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
        );
    END IF;
END
$$;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies WHERE tablename = 'objects' AND policyname = 'Allow public read access for downloads'
    ) THEN
        CREATE POLICY "Allow public read access for downloads" ON storage.objects
        FOR SELECT
        USING (bucket_id = 'downloads');
    END IF;
END
$$;
