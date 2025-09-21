-- Create Members Table
CREATE TABLE members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name TEXT NOT NULL,
    cnic TEXT UNIQUE,
    ntn TEXT UNIQUE,
    address TEXT,
    business_name TEXT,
    mobile_number TEXT,
    business_type TEXT,
    membership_type TEXT,
    membership_code TEXT UNIQUE,
    membership_expiry DATE,
    photo_url TEXT,
    status TEXT DEFAULT 'Active',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Verification Requests Table
CREATE TABLE verification_requests (
    id SERIAL PRIMARY KEY,
    company_name TEXT NOT NULL,
    ntn TEXT NOT NULL,
    status TEXT DEFAULT 'Pending', -- Pending, Approved, Rejected
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Vacancies Table
CREATE TABLE vacancies (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    status TEXT DEFAULT 'Open', -- Open, Closed
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create Roles Table
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create Permissions Table
CREATE TABLE permissions (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE
);

-- Create Role-Permissions Junction Table
CREATE TABLE role_permissions (
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

-- Create User-Roles Junction Table
CREATE TABLE user_roles (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id INT REFERENCES roles(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, role_id)
);

-- Create Activity Logs Table
CREATE TABLE activity_logs (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    action TEXT NOT NULL,
    admin_email TEXT,
    timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS for all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE vacancies ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for 'members' table
CREATE POLICY "Allow admin to manage members" ON members
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
) WITH CHECK (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

-- RLS Policies for 'vacancies' table
CREATE POLICY "Allow public read access for open vacancies" ON vacancies
FOR SELECT USING (status = 'Open');

CREATE POLICY "Allow admin to manage vacancies" ON vacancies
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
) WITH CHECK (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);


-- RLS Policies for other admin-only tables
CREATE POLICY "Allow admin full access" ON verification_requests
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow admin full access" ON roles
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow admin full access" ON permissions
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow admin full access" ON role_permissions
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow admin full access" ON user_roles
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow admin full access" ON activity_logs
FOR ALL USING (
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);


-- Insert default roles and permissions
INSERT INTO roles (name) VALUES ('Admin'), ('Editor'), ('Viewer');
INSERT INTO permissions (name) VALUES ('all'), ('edit_content'), ('manage_users'), ('view_content'), ('manage_settings');

-- Assign 'all' permission to 'Admin' role
INSERT INTO role_permissions (role_id, permission_id) VALUES
((SELECT id FROM roles WHERE name = 'Admin'), (SELECT id FROM permissions WHERE name = 'all')),
((SELECT id FROM roles WHERE name = 'Editor'), (SELECT id FROM permissions WHERE name = 'edit_content')),
((SELECT id FROM roles WHERE name = 'Editor'), (SELECT id FROM permissions WHERE name = 'manage_users')),
((SELECT id FROM roles WHERE name = 'Viewer'), (SELECT id FROM permissions WHERE name = 'view_content'));


-- Create Storage Bucket for Member Photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('member_photos', 'member_photos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies for 'member_photos' bucket
CREATE POLICY "Allow admin to upload photos" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (
    bucket_id = 'member_photos' AND
    (auth.jwt() ->> 'email') IN (SELECT email FROM auth.users WHERE id IN (SELECT user_id FROM user_roles WHERE role_id = (SELECT id FROM roles WHERE name = 'Admin')))
);

CREATE POLICY "Allow public read access for photos" ON storage.objects
FOR SELECT
USING (bucket_id = 'member_photos');
