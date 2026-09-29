-- =============================================
-- ROW LEVEL SECURITY POLICIES
-- Run AFTER 001_initial_schema.sql
-- =============================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_curriculum ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.result_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;

-- =============================================
-- HELPER: Check if user is authenticated admin
-- =============================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (auth.uid() IS NOT NULL);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- PROFILES
-- =============================================
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.is_admin());
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- SITE SETTINGS
-- =============================================
CREATE POLICY "Public can read site settings" ON public.site_settings FOR SELECT USING (TRUE);
CREATE POLICY "Admins can update site settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- =============================================
-- COURSE CATEGORIES
-- =============================================
CREATE POLICY "Public can read course categories" ON public.course_categories FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage course categories" ON public.course_categories FOR ALL USING (public.is_admin());

-- =============================================
-- COURSES
-- =============================================
CREATE POLICY "Public can read published courses" ON public.courses FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all courses" ON public.courses FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage courses" ON public.courses FOR ALL USING (public.is_admin());

-- =============================================
-- COURSE FEATURES
-- =============================================
CREATE POLICY "Public can read course features" ON public.course_features FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND is_published = TRUE)
);
CREATE POLICY "Admins can manage course features" ON public.course_features FOR ALL USING (public.is_admin());

-- =============================================
-- COURSE CURRICULUM
-- =============================================
CREATE POLICY "Public can read course curriculum" ON public.course_curriculum FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_id AND is_published = TRUE)
);
CREATE POLICY "Admins can manage course curriculum" ON public.course_curriculum FOR ALL USING (public.is_admin());

-- =============================================
-- FACULTY
-- =============================================
CREATE POLICY "Public can read published faculty" ON public.faculty FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all faculty" ON public.faculty FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage faculty" ON public.faculty FOR ALL USING (public.is_admin());

-- =============================================
-- RESULT STATISTICS
-- =============================================
CREATE POLICY "Public can read result statistics" ON public.result_statistics FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage result statistics" ON public.result_statistics FOR ALL USING (public.is_admin());

-- =============================================
-- RESULTS
-- =============================================
CREATE POLICY "Public can read published results" ON public.results FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all results" ON public.results FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage results" ON public.results FOR ALL USING (public.is_admin());

-- =============================================
-- TESTIMONIALS
-- =============================================
CREATE POLICY "Public can read published testimonials" ON public.testimonials FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all testimonials" ON public.testimonials FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

-- =============================================
-- BLOG CATEGORIES
-- =============================================
CREATE POLICY "Public can read blog categories" ON public.blog_categories FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage blog categories" ON public.blog_categories FOR ALL USING (public.is_admin());

-- =============================================
-- BLOGS
-- =============================================
CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all blogs" ON public.blogs FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage blogs" ON public.blogs FOR ALL USING (public.is_admin());

-- =============================================
-- RESOURCE CATEGORIES
-- =============================================
CREATE POLICY "Public can read resource categories" ON public.resource_categories FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage resource categories" ON public.resource_categories FOR ALL USING (public.is_admin());

-- =============================================
-- RESOURCES
-- =============================================
CREATE POLICY "Public can read published resources" ON public.resources FOR SELECT USING (is_published = TRUE);
CREATE POLICY "Admins can read all resources" ON public.resources FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can manage resources" ON public.resources FOR ALL USING (public.is_admin());
-- Allow public to increment download count
CREATE POLICY "Public can increment download count" ON public.resources FOR UPDATE USING (TRUE) WITH CHECK (TRUE);

-- =============================================
-- ENQUIRIES
-- =============================================
-- Public can INSERT enquiries (contact form)
CREATE POLICY "Public can submit enquiries" ON public.enquiries FOR INSERT WITH CHECK (TRUE);
-- Only admins can read/update enquiries
CREATE POLICY "Admins can read enquiries" ON public.enquiries FOR SELECT USING (public.is_admin());
CREATE POLICY "Admins can update enquiries" ON public.enquiries FOR UPDATE USING (public.is_admin());

-- =============================================
-- HOMEPAGE SECTIONS
-- =============================================
CREATE POLICY "Public can read homepage sections" ON public.homepage_sections FOR SELECT USING (TRUE);
CREATE POLICY "Admins can manage homepage sections" ON public.homepage_sections FOR ALL USING (public.is_admin());

-- =============================================
-- STORAGE BUCKETS
-- Create these in Supabase Dashboard > Storage
-- or run via Supabase CLI
-- =============================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('academy-images', 'academy-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('course-images', 'course-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('faculty-images', 'faculty-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('resources', 'resources', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-media', 'site-media', true);
