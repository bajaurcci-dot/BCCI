-- Standardize RLS policies to use the optimized is_admin() function

-- Registrations Table
DROP POLICY IF EXISTS "Admin full access to registrations" ON public.registrations;
CREATE POLICY "Admin full access to registrations" ON public.registrations
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Service Requests Table
DROP POLICY IF EXISTS "Admin full access to service_requests" ON public.service_requests;
CREATE POLICY "Admin full access to service_requests" ON public.service_requests
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Vacancies Table
DROP POLICY IF EXISTS "Admin full access to vacancies" ON public.vacancies;
CREATE POLICY "Admin full access to vacancies" ON public.vacancies
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Downloads Table
DROP POLICY IF EXISTS "Admin full access to downloads" ON public.downloads;
CREATE POLICY "Admin full access to downloads" ON public.downloads
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Contact Messages Table
DROP POLICY IF EXISTS "Admin full access to contact_messages" ON public.contact_messages;
CREATE POLICY "Admin full access to contact_messages" ON public.contact_messages
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Activity Logs Table
DROP POLICY IF EXISTS "Admin read activity_logs" ON public.activity_logs;
-- Create a comprehensive Admin policy (Read/Insert/etc)
CREATE POLICY "Admin full access to activity_logs" ON public.activity_logs
FOR ALL
USING (public.is_admin())
WITH CHECK (public.is_admin());
