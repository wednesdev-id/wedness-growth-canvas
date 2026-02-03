-- Enable Row Level Security (optional, for public read access)
-- We will enable it after creating tables

-- 1. Products Table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100), -- mapped from role/category
  price VARCHAR(100),
  rating DECIMAL(2,1) DEFAULT 5.0,
  users VARCHAR(50) DEFAULT '100+',
  release_date VARCHAR(50),
  features TEXT[] DEFAULT '{}',
  image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  product_url TEXT, -- Renamed from demo_url
  status VARCHAR(20) DEFAULT 'available' CHECK (status IN ('available', 'coming_soon')),
  role VARCHAR(100), -- kept for compatibility, same as category
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure product_url column exists if table already existed without it (Migration logic)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'product_url') THEN
        ALTER TABLE products ADD COLUMN product_url TEXT;
    END IF;
END $$;

-- Ensure gallery column exists for products (Migration logic)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'products' AND column_name = 'gallery') THEN
        ALTER TABLE products ADD COLUMN gallery TEXT[] DEFAULT '{}';
    END IF;
END $$;

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON products FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON products FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON products FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'products' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON products FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 2. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    excerpt TEXT,
    content TEXT, -- Full content if needed, or link
    author VARCHAR(100),
    date VARCHAR(50), -- Display date string
    tags TEXT[] DEFAULT '{}', -- Replaced category with tags
    image_url TEXT,
    read_time VARCHAR(20),
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

-- Ensure tags column exists (Migration logic)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'tags') THEN
        ALTER TABLE blog_posts ADD COLUMN tags TEXT[] DEFAULT '{}';
    END IF;
END $$;

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON blog_posts FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON blog_posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON blog_posts FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_posts' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON blog_posts FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 3. Learning Resources Table
CREATE TABLE IF NOT EXISTS learning_resources (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50) DEFAULT 'Video', -- Video, Article, Course
  level VARCHAR(50), -- Beginner, Intermediate, Advanced
  duration VARCHAR(50),
  instructor VARCHAR(100),
  image_url TEXT,
  link_url TEXT,
  tags TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE learning_resources ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'learning_resources' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON learning_resources FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'learning_resources' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON learning_resources FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'learning_resources' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON learning_resources FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'learning_resources' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON learning_resources FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 4. Portfolio Projects Table
CREATE TABLE IF NOT EXISTS portfolio_projects (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  image_url TEXT,
  gallery TEXT[] DEFAULT '{}',
  results TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  rating DECIMAL(2,1) DEFAULT 5.0,
  publish_date VARCHAR(50),
  link VARCHAR(255),
  review TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure gallery column exists for portfolio_projects (Migration logic)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'portfolio_projects' AND column_name = 'gallery') THEN
        ALTER TABLE portfolio_projects ADD COLUMN gallery TEXT[] DEFAULT '{}';
    END IF;
END $$;

ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_projects' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON portfolio_projects FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_projects' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON portfolio_projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_projects' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON portfolio_projects FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'portfolio_projects' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON portfolio_projects FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 5. Testimonials Table
CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    role VARCHAR(100),
    company VARCHAR(100),
    avatar VARCHAR(255), -- Emoji or URL
    testimonial TEXT,
    rating INTEGER DEFAULT 5,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON testimonials FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'testimonials' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 6. Service Packages Table
CREATE TABLE IF NOT EXISTS service_packages (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  price_label VARCHAR(100),
  target TEXT,
  features TEXT[] DEFAULT '{}',
  duration VARCHAR(50),
  optional_note TEXT,
  popular BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE service_packages ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_packages' AND policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON service_packages FOR SELECT USING (true);
    END IF;

    -- Add Write Access for Authenticated Users
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_packages' AND policyname = 'Allow authenticated insert') THEN
        CREATE POLICY "Allow authenticated insert" ON service_packages FOR INSERT WITH CHECK (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_packages' AND policyname = 'Allow authenticated update') THEN
        CREATE POLICY "Allow authenticated update" ON service_packages FOR UPDATE USING (auth.role() = 'authenticated');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'service_packages' AND policyname = 'Allow authenticated delete') THEN
        CREATE POLICY "Allow authenticated delete" ON service_packages FOR DELETE USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- ==========================================
-- RBAC & COLLABORATION SCHEMA EXTENSION
-- ==========================================

-- 7. Update Users Table (Roles & Profile)
-- Note: 'users' usually refers to auth.users or public.users.
-- Assuming we extend public.profiles or public.users if it exists,
-- BUT often Supabase uses auth.users.
-- Since we cannot easily alter auth.users directly in all environments,
-- we typically create a public.profiles table that references auth.users.
-- HOWEVER, based on the prompt, I will add columns to the 'users' table if it exists in public,
-- or create a profiles table if that's the pattern.
-- Let's stick to the requested plan: "Update users table".
-- I will create a `users` table in public if it doesn't exist (mirroring auth.users) similar to typical Supabase patterns.

CREATE TABLE IF NOT EXISTS users (
    id UUID REFERENCES auth.users (id) PRIMARY KEY,
    email VARCHAR(255),
    role VARCHAR(20) DEFAULT 'writer' CHECK (
        role IN (
            'owner',
            'editor',
            'writer',
            'ghost_writer',
            'team'
        )
    ),
    display_name VARCHAR(100),
    avatar_url TEXT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Public profiles are viewable by everyone') THEN
        CREATE POLICY "Public profiles are viewable by everyone" ON users FOR SELECT USING (true);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can insert their own profile') THEN
        CREATE POLICY "Users can insert their own profile" ON users FOR INSERT WITH CHECK (auth.uid() = id);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can update own profile') THEN
        CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
    END IF;
END $$;

-- 8. Extensions for Blog Posts (RBAC Columns)
DO $$
BEGIN
    -- author_id
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'author_id') THEN
        ALTER TABLE blog_posts ADD COLUMN author_id UUID REFERENCES auth.users(id);
    END IF;

    -- status
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'status') THEN
        ALTER TABLE blog_posts ADD COLUMN status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'pending_review', 'published', 'rejected'));
    END IF;

    -- reviewed_by
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'reviewed_by') THEN
        ALTER TABLE blog_posts ADD COLUMN reviewed_by UUID REFERENCES auth.users(id);
    END IF;

    -- reviewed_at
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'reviewed_at') THEN
        ALTER TABLE blog_posts ADD COLUMN reviewed_at TIMESTAMP WITH TIME ZONE;
    END IF;

    -- rejection_reason
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'rejection_reason') THEN
        ALTER TABLE blog_posts ADD COLUMN rejection_reason TEXT;
    END IF;

    -- published_at
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'blog_posts' AND column_name = 'published_at') THEN
        ALTER TABLE blog_posts ADD COLUMN published_at TIMESTAMP WITH TIME ZONE;
    END IF;
END $$;

-- 9. Blog Post Collaborators
CREATE TABLE IF NOT EXISTS blog_post_collaborators (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts (id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users (id),
    role VARCHAR(20) DEFAULT 'contributor' CHECK (
        role IN (
            'co_author',
            'contributor',
            'mentioned'
        )
    ),
    can_edit BOOLEAN DEFAULT false,
    edit_requested BOOLEAN DEFAULT false,
    edit_requested_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW(),
        UNIQUE (post_id, user_id)
);

ALTER TABLE blog_post_collaborators ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'blog_post_collaborators' AND policyname = 'Collaborators viewable by authenticated users') THEN
        CREATE POLICY "Collaborators viewable by authenticated users" ON blog_post_collaborators FOR SELECT USING (auth.role() = 'authenticated');
    END IF;
END $$;

-- 10. Edit Requests
CREATE TABLE IF NOT EXISTS edit_requests (
    id SERIAL PRIMARY KEY,
    post_id INTEGER REFERENCES blog_posts (id) ON DELETE CASCADE,
    requester_id UUID REFERENCES auth.users (id),
    status VARCHAR(20) DEFAULT 'pending' CHECK (
        status IN (
            'pending',
            'approved',
            'rejected'
        )
    ),
    message TEXT,
    reviewed_by UUID REFERENCES auth.users (id),
    reviewed_at TIMESTAMP
    WITH
        TIME ZONE,
        created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT NOW()
);

ALTER TABLE edit_requests ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'edit_requests' AND policyname = 'Edit requests viewable by stakeholders') THEN
        CREATE POLICY "Edit requests viewable by stakeholders" ON edit_requests 
        FOR SELECT USING (
            auth.uid() = requester_id OR 
            EXISTS (SELECT 1 FROM blog_posts WHERE id = post_id AND author_id = auth.uid()) OR
            EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('owner', 'team'))
        );
    END IF;
END $$;