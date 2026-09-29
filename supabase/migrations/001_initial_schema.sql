-- =============================================
-- KARMAYOGI ACADEMY — Initial Database Schema
-- Run this in your Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- PROFILES (extends Supabase auth.users)
-- =============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- =============================================
-- SITE SETTINGS
-- =============================================
CREATE TABLE public.site_settings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  academy_name TEXT DEFAULT 'Karmayogi Academy Nashik',
  logo_url TEXT,
  phone TEXT DEFAULT '+91 93255 89491',
  whatsapp TEXT DEFAULT '919325589491',
  email TEXT DEFAULT 'info@karmayogiacademy.com',
  address TEXT DEFAULT 'Kasture Sadan, Ghankar Lane, beside Tulja Bhawani Mandir, near Panchavati Hotel, Vakil Wadi, Raviwar Karanje, Panchavati, Nashik, Maharashtra 422001',
  google_maps_url TEXT DEFAULT 'https://maps.google.com/?q=Karmayogi+Academy+Nashik',
  google_maps_embed TEXT,
  facebook_url TEXT DEFAULT 'https://facebook.com/karmayogiacademy',
  instagram_url TEXT DEFAULT 'https://instagram.com/karmayogiacademy',
  youtube_url TEXT DEFAULT 'https://www.youtube.com/@karmayogimpsc',
  google_play_url TEXT DEFAULT 'https://play.google.com/store/apps/details?id=co.barney.ywavu',
  opening_hours TEXT DEFAULT 'Monday–Saturday: 8:00 AM – 9:00 PM | Sunday: 10:00 AM – 2:00 PM',
  footer_description TEXT DEFAULT 'Maharashtra''s Premier MPSC Coaching Institute in Nashik. Dedicated officer preparation with 52-week structured system.',
  hero_tagline TEXT DEFAULT 'Emerging as Officers, The Future is Unveiled',
  hero_subtitle TEXT DEFAULT 'Prepare for Rajyaseva, PSI, STI, ASO, Saralseva & Talathi Bharti with experienced post-holder faculty and a proven 52-week system.',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COURSE CATEGORIES
-- =============================================
CREATE TABLE public.course_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COURSES
-- =============================================
CREATE TABLE public.courses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.course_categories(id) ON DELETE SET NULL,
  short_description TEXT,
  description TEXT,
  duration TEXT,
  image_url TEXT,
  syllabus_url TEXT,
  admission_status TEXT DEFAULT 'open' CHECK (admission_status IN ('open', 'closed', 'upcoming', 'limited')),
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- COURSE FEATURES (highlights/benefits)
-- =============================================
CREATE TABLE public.course_features (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  feature TEXT NOT NULL,
  display_order INTEGER DEFAULT 0
);

-- =============================================
-- COURSE CURRICULUM
-- =============================================
CREATE TABLE public.course_curriculum (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- =============================================
-- FACULTY
-- =============================================
CREATE TABLE public.faculty (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  photo_url TEXT,
  designation TEXT,
  subject TEXT,
  experience TEXT,
  description TEXT,
  badge TEXT,
  is_founder BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RESULT STATISTICS
-- =============================================
CREATE TABLE public.result_statistics (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0
);

-- =============================================
-- RESULTS (achievers)
-- =============================================
CREATE TABLE public.results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_name TEXT NOT NULL,
  photo_url TEXT,
  exam TEXT NOT NULL,
  post_secured TEXT NOT NULL,
  batch TEXT,
  year INTEGER,
  result_rank TEXT,
  quote TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- TESTIMONIALS
-- =============================================
CREATE TABLE public.testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  student_name TEXT NOT NULL,
  photo_url TEXT,
  course TEXT,
  review TEXT NOT NULL,
  rating INTEGER DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_published BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BLOG CATEGORIES
-- =============================================
CREATE TABLE public.blog_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- BLOGS
-- =============================================
CREATE TABLE public.blogs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.blog_categories(id) ON DELETE SET NULL,
  featured_image TEXT,
  excerpt TEXT,
  content TEXT,
  author TEXT DEFAULT 'Karmayogi Academy',
  published_at TIMESTAMPTZ,
  is_published BOOLEAN DEFAULT FALSE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RESOURCE CATEGORIES
-- =============================================
CREATE TABLE public.resource_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- RESOURCES (PDFs)
-- =============================================
CREATE TABLE public.resources (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category_id UUID REFERENCES public.resource_categories(id) ON DELETE SET NULL,
  target_exam TEXT,
  description TEXT,
  file_path TEXT,
  file_url TEXT,
  download_count INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ENQUIRIES
-- =============================================
CREATE TABLE public.enquiries (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name TEXT NOT NULL,
  mobile TEXT NOT NULL,
  email TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  course_name TEXT,
  preferred_batch TEXT,
  message TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'follow_up', 'converted', 'closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- HOMEPAGE SECTIONS (CMS toggles)
-- =============================================
CREATE TABLE public.homepage_sections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  section_key TEXT NOT NULL UNIQUE,
  title TEXT,
  subtitle TEXT,
  is_visible BOOLEAN DEFAULT TRUE,
  display_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers
CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_faculty_updated_at BEFORE UPDATE ON public.faculty FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_resources_updated_at BEFORE UPDATE ON public.resources FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_enquiries_updated_at BEFORE UPDATE ON public.enquiries FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE PROCEDURE public.update_updated_at_column();
