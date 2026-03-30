-- Job Application Tracker Schema
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- set up row level security for profiles
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own profile.') THEN
    CREATE POLICY "Users can view their own profile."
      ON profiles FOR SELECT
      USING ( auth.uid() = id );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own profile.') THEN
    CREATE POLICY "Users can update own profile."
      ON profiles FOR UPDATE
      USING ( auth.uid() = id );
  END IF;
END $$;

-- Create a trigger to automatically create a profile for a new user
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    new.id, 
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- APPLICATIONS TABLE
DO $$ BEGIN
  CREATE TYPE application_status AS ENUM ('applied', 'interview', 'offer', 'rejected');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  status application_status DEFAULT 'applied' NOT NULL,
  job_link TEXT,
  notes TEXT,
  applied_date DATE DEFAULT CURRENT_DATE,
  follow_up_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- set up row level security for applications
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can view their own applications.') THEN
    CREATE POLICY "Users can view their own applications."
      ON applications FOR SELECT
      USING ( auth.uid() = user_id );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can insert their own applications.') THEN
    CREATE POLICY "Users can insert their own applications."
      ON applications FOR INSERT
      WITH CHECK ( auth.uid() = user_id );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update their own applications.') THEN
    CREATE POLICY "Users can update their own applications."
      ON applications FOR UPDATE
      USING ( auth.uid() = user_id );
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete their own applications.') THEN
    CREATE POLICY "Users can delete their own applications."
      ON applications FOR DELETE
      USING ( auth.uid() = user_id );
  END IF;
END $$;

-- Create trigger for tracking updated_at
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS update_applications_updated_at ON applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON applications
  FOR EACH ROW
  EXECUTE PROCEDURE set_updated_at();

-- Analytics view
CREATE OR REPLACE VIEW application_stats AS
SELECT 
  user_id,
  COUNT(*) as total_applications,
  SUM(CASE WHEN status = 'interview' THEN 1 ELSE 0 END) as interviews_count,
  SUM(CASE WHEN status = 'offer' THEN 1 ELSE 0 END) as offers_count,
  SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejections_count
FROM applications
GROUP BY user_id;

-- 1. ENHANCE PROFILES Table
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='bio') THEN
    ALTER TABLE profiles ADD COLUMN bio TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='target_role') THEN
    ALTER TABLE profiles ADD COLUMN target_role TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='target_salary') THEN
    ALTER TABLE profiles ADD COLUMN target_salary TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='linkedin_url') THEN
    ALTER TABLE profiles ADD COLUMN linkedin_url TEXT;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='portfolio_url') THEN
    ALTER TABLE profiles ADD COLUMN portfolio_url TEXT;
  END IF;
END $$;

-- 2. CREATE INTERVIEW ROUNDS TABLE
CREATE TABLE IF NOT EXISTS public.interview_rounds (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  application_id UUID REFERENCES public.applications(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  round_name TEXT NOT NULL,
  round_date TIMESTAMP WITH TIME ZONE,
  feedback TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.interview_rounds ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own interview rounds.') THEN
    CREATE POLICY "Users can manage their own interview rounds."
      ON public.interview_rounds FOR ALL
      USING ( auth.uid() = user_id );
  END IF;
END $$;

-- 3. CREATE CONTACTS TABLE (Networking Hub)
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name TEXT,
  name TEXT NOT NULL,
  role TEXT,
  email TEXT,
  linkedin_url TEXT,
  last_contact_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own contacts.') THEN
    CREATE POLICY "Users can manage their own contacts."
      ON public.contacts FOR ALL
      USING ( auth.uid() = user_id );
  END IF;
END $$;

-- 4. CREATE DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type TEXT,
  url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can manage their own documents.') THEN
    CREATE POLICY "Users can manage their own documents."
      ON public.documents FOR ALL
      USING ( auth.uid() = user_id );
  END IF;
END $$;
