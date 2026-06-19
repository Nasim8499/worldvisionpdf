
-- =========================================================
-- ROLES
-- =========================================================
CREATE TYPE public.app_role AS ENUM ('admin', 'editor', 'viewer');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

-- =========================================================
-- PROFILES
-- =========================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email))
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =========================================================
-- PUBLICATIONS
-- =========================================================
CREATE TABLE public.bookshelf_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.bookshelf_categories TO anon, authenticated;
GRANT ALL ON public.bookshelf_categories TO service_role;
ALTER TABLE public.bookshelf_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are public" ON public.bookshelf_categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins manage categories" ON public.bookshelf_categories FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.publications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  category_id UUID REFERENCES public.bookshelf_categories(id) ON DELETE SET NULL,
  cover_url TEXT,
  language TEXT DEFAULT 'en',
  is_published BOOLEAN NOT NULL DEFAULT true,
  is_password_protected BOOLEAN NOT NULL DEFAULT false,
  access_password TEXT,
  download_allowed BOOLEAN NOT NULL DEFAULT true,
  print_allowed BOOLEAN NOT NULL DEFAULT true,
  watermark_enabled BOOLEAN NOT NULL DEFAULT false,
  expiry_date TIMESTAMPTZ,
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.publications TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.publications TO authenticated;
GRANT ALL ON public.publications TO service_role;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Published pubs are public" ON public.publications FOR SELECT TO anon, authenticated USING (is_published = true OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Editors manage publications" ON public.publications FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.publication_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  publication_id UUID NOT NULL REFERENCES public.publications(id) ON DELETE CASCADE,
  page_number INT NOT NULL,
  title TEXT,
  layout_key TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (publication_id, page_number)
);
GRANT SELECT ON public.publication_pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.publication_pages TO authenticated;
GRANT ALL ON public.publication_pages TO service_role;
ALTER TABLE public.publication_pages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Pages public if pub published" ON public.publication_pages FOR SELECT TO anon, authenticated USING (
  EXISTS (SELECT 1 FROM public.publications p WHERE p.id = publication_id AND (p.is_published = true OR public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor')))
);
CREATE POLICY "Editors manage pages" ON public.publication_pages FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'))
  WITH CHECK (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

-- =========================================================
-- LEADS / FORMS
-- =========================================================
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source TEXT NOT NULL, -- 'consultation','candidate','employer','newsletter','contact'
  full_name TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  message TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.leads TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.leads TO authenticated;
GRANT ALL ON public.leads TO service_role;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone submits leads" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view leads" ON public.leads FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Admins update leads" ON public.leads FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Admins delete leads" ON public.leads FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.consultation_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_date DATE,
  preferred_time TEXT,
  service_interest TEXT,
  destination_country TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.consultation_bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.consultation_bookings TO authenticated;
GRANT ALL ON public.consultation_bookings TO service_role;
ALTER TABLE public.consultation_bookings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone books consultation" ON public.consultation_bookings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view bookings" ON public.consultation_bookings FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Admins update bookings" ON public.consultation_bookings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.candidate_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  nationality TEXT,
  current_country TEXT,
  desired_country TEXT,
  occupation TEXT,
  years_experience INT,
  education TEXT,
  visa_type TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.candidate_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.candidate_applications TO authenticated;
GRANT ALL ON public.candidate_applications TO service_role;
ALTER TABLE public.candidate_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone applies" ON public.candidate_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view apps" ON public.candidate_applications FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Admins update apps" ON public.candidate_applications FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.employer_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  country TEXT,
  industry TEXT,
  positions_needed INT,
  hire_timeline TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'new',
  consent_given BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.employer_inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.employer_inquiries TO authenticated;
GRANT ALL ON public.employer_inquiries TO service_role;
ALTER TABLE public.employer_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone inquires" ON public.employer_inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view employer inquiries" ON public.employer_inquiries FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));
CREATE POLICY "Admins update employer inquiries" ON public.employer_inquiries FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  source TEXT,
  consent_given BOOLEAN NOT NULL DEFAULT true,
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMPTZ
);
GRANT INSERT ON public.newsletter_subscribers TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.newsletter_subscribers TO authenticated;
GRANT ALL ON public.newsletter_subscribers TO service_role;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone subscribes" ON public.newsletter_subscribers FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins view subs" ON public.newsletter_subscribers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

-- =========================================================
-- ANALYTICS
-- =========================================================
CREATE TABLE public.reader_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT NOT NULL,
  publication_id UUID REFERENCES public.publications(id) ON DELETE SET NULL,
  country TEXT,
  device TEXT,
  browser TEXT,
  referrer TEXT,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  duration_seconds INT
);
GRANT INSERT ON public.reader_sessions TO anon, authenticated;
GRANT SELECT, UPDATE ON public.reader_sessions TO authenticated;
GRANT ALL ON public.reader_sessions TO service_role;
ALTER TABLE public.reader_sessions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone tracks session" ON public.reader_sessions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Anyone updates own session" ON public.reader_sessions FOR UPDATE TO anon, authenticated USING (true);
CREATE POLICY "Admins read sessions" ON public.reader_sessions FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.page_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT,
  publication_id UUID REFERENCES public.publications(id) ON DELETE SET NULL,
  page_number INT NOT NULL,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  dwell_seconds INT
);
GRANT INSERT ON public.page_views TO anon, authenticated;
GRANT SELECT ON public.page_views TO authenticated;
GRANT ALL ON public.page_views TO service_role;
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logs page view" ON public.page_views FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read page views" ON public.page_views FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.cta_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT,
  publication_id UUID REFERENCES public.publications(id) ON DELETE SET NULL,
  page_number INT,
  cta_key TEXT NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  clicked_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.cta_clicks TO anon, authenticated;
GRANT SELECT ON public.cta_clicks TO authenticated;
GRANT ALL ON public.cta_clicks TO service_role;
ALTER TABLE public.cta_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logs cta" ON public.cta_clicks FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read cta" ON public.cta_clicks FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.share_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT,
  publication_id UUID REFERENCES public.publications(id) ON DELETE SET NULL,
  channel TEXT NOT NULL,
  shared_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.share_events TO anon, authenticated;
GRANT SELECT ON public.share_events TO authenticated;
GRANT ALL ON public.share_events TO service_role;
ALTER TABLE public.share_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logs share" ON public.share_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read share" ON public.share_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

CREATE TABLE public.download_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_token TEXT,
  publication_id UUID REFERENCES public.publications(id) ON DELETE SET NULL,
  file_key TEXT,
  downloaded_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT INSERT ON public.download_events TO anon, authenticated;
GRANT SELECT ON public.download_events TO authenticated;
GRANT ALL ON public.download_events TO service_role;
ALTER TABLE public.download_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone logs download" ON public.download_events FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins read download" ON public.download_events FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'editor'));

-- =========================================================
-- SETTINGS
-- =========================================================
CREATE TABLE public.branding_settings (
  id INT PRIMARY KEY DEFAULT 1,
  company_name TEXT NOT NULL DEFAULT 'World Vision Consultancy',
  tagline TEXT DEFAULT 'Global Mobility • Immigration • Recruitment',
  logo_url TEXT,
  favicon_url TEXT,
  primary_color TEXT DEFAULT '#0B1B2B',
  accent_color TEXT DEFAULT '#B8924A',
  contact_email TEXT,
  contact_phone TEXT,
  whatsapp_number TEXT,
  address TEXT,
  social_links JSONB DEFAULT '{}'::jsonb,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (id = 1)
);
GRANT SELECT ON public.branding_settings TO anon, authenticated;
GRANT INSERT, UPDATE ON public.branding_settings TO authenticated;
GRANT ALL ON public.branding_settings TO service_role;
ALTER TABLE public.branding_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Branding public" ON public.branding_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins edit branding" ON public.branding_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.security_settings (
  id INT PRIMARY KEY DEFAULT 1,
  password_protection_enabled BOOLEAN DEFAULT false,
  default_password TEXT,
  download_restricted BOOLEAN DEFAULT false,
  print_restricted BOOLEAN DEFAULT false,
  allowed_domains TEXT[] DEFAULT ARRAY[]::TEXT[],
  watermark_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CHECK (id = 1)
);
GRANT INSERT, UPDATE, SELECT ON public.security_settings TO authenticated;
GRANT ALL ON public.security_settings TO service_role;
ALTER TABLE public.security_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage security" ON public.security_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE TABLE public.notification_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  new_lead_alert BOOLEAN DEFAULT true,
  consultation_alert BOOLEAN DEFAULT true,
  employer_alert BOOLEAN DEFAULT true,
  view_milestone_alert BOOLEAN DEFAULT false,
  share_download_alert BOOLEAN DEFAULT false,
  email_recipient TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.notification_preferences TO authenticated;
GRANT ALL ON public.notification_preferences TO service_role;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users manage own prefs" ON public.notification_preferences FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- =========================================================
-- SEED branding row
-- =========================================================
INSERT INTO public.branding_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
INSERT INTO public.security_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;
