import { createClient } from '@/lib/supabase/server';


export async function getSiteSettings() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('site_settings').
  select('*').
  single();
  if (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
  return data;
}