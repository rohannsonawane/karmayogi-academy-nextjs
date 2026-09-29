import { createClient } from '@/lib/supabase/server';
import { MOCK_FACULTY } from '@/lib/data/mockData';

export async function getFaculty(founderOnly) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('faculty')
      .select('*')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (founderOnly !== undefined) {
      query = query.eq('is_founder', founderOnly);
    }

    // FORCED OPTION B: Return mock data directly for now
    
    // if (founderOnly !== undefined) {
    //   return MOCK_FACULTY.filter((f) => f.is_founder === founderOnly);
    // }
    // return MOCK_FACULTY;
    
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (founderOnly !== undefined) {
        return MOCK_FACULTY.filter((f) => f.is_founder === founderOnly);
      }
      return MOCK_FACULTY;
    }
    // DB uses `photo_url`; normalise to `image_url` so all components stay consistent
    return data.map((f) => ({ ...f, image_url: f.photo_url ?? '' }));
  } catch {
    if (founderOnly !== undefined) {
      return MOCK_FACULTY.filter((f) => f.is_founder === founderOnly);
    }
    return MOCK_FACULTY;
  }
}

export async function getAllFaculty() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('faculty').
  select('*').
  order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching all faculty:', error);
    return [];
  }
  return data || [];
}