-- Standardize Storage RLS Policies using is_admin()

-- MEMBERS PHOTOS BUCKET
DROP POLICY IF EXISTS "Admins can upload member photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update member photos" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete member photos" ON storage.objects;
DROP POLICY IF EXISTS "Public can view member photos" ON storage.objects;

CREATE POLICY "Admins can upload member photos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'member-photos' AND public.is_admin());

CREATE POLICY "Admins can update member photos" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'member-photos' AND public.is_admin());

CREATE POLICY "Admins can delete member photos" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'member-photos' AND public.is_admin());

CREATE POLICY "Public can view member photos" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'member-photos');


-- DOWNLOADS BUCKET
DROP POLICY IF EXISTS "Admins can upload downloads" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete downloads" ON storage.objects;
DROP POLICY IF EXISTS "Public can view downloads" ON storage.objects;

CREATE POLICY "Admins can upload downloads" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'downloads' AND public.is_admin());

CREATE POLICY "Admins can update downloads" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'downloads' AND public.is_admin());

CREATE POLICY "Admins can delete downloads" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'downloads' AND public.is_admin());

CREATE POLICY "Public can view downloads" ON storage.objects
FOR SELECT TO public
USING (bucket_id = 'downloads');


-- CERTIFICATES BUCKET
DROP POLICY IF EXISTS "Admins can manage certificates" ON storage.objects;

CREATE POLICY "Admins can manage certificates" ON storage.objects
FOR ALL TO authenticated
USING (bucket_id = 'certificates' AND public.is_admin())
WITH CHECK (bucket_id = 'certificates' AND public.is_admin());


-- ENSURE BUCKETS EXIST AND ARE PUBLIC (Idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('member-photos', 'member-photos', true),
  ('downloads', 'downloads', true)
ON CONFLICT (id) DO UPDATE SET public = excluded.public;
