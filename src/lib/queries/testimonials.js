import { createClient } from '@/lib/supabase/server';


export async function getTestimonials(limit) {
  const supabase = await createClient();
  let query = supabase.
  from('testimonials').
  select('*').
  eq('is_published', true).
  order('display_order', { ascending: true });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  if (error) {
    console.error('Error fetching testimonials:', error);
    return [];
  }
  return data || [];
}

export async function getAllTestimonials() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('testimonials').
  select('*').
  order('display_order', { ascending: true });
  if (error) return [];
  return data || [];
}