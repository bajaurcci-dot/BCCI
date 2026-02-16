-- Create a secure function to check if the current user is an admin
-- This function runs with the privileges of the creator (SECURITY DEFINER), bypassing RLS on user_roles
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = auth.uid()
    AND r.name = 'Admin'
  );
$$;

-- Drop the potentially recursive/broken policies on 'members'
DROP POLICY IF EXISTS "Allow admin to manage members" ON members;

-- Create a new, efficient policy using the is_admin() function
CREATE POLICY "Allow admin to manage members" ON members
FOR ALL
USING (is_admin())
WITH CHECK (is_admin());

-- Also fix 'registrations' policy if needed, though the error was on members.
-- Ensuring admins can definitely insert/update members is the priority.
