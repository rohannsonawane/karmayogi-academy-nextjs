import { createClient } from '@/lib/supabase/server';
import { MOCK_RESULTS, MOCK_RESULT_STATISTICS } from '@/lib/data/mockData';

export async function getResults(featuredOnly) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('results')
      .select('*')
      .eq('is_published', true)
      .order('year', { ascending: false });

    if (featuredOnly) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      if (featuredOnly) {
        return MOCK_RESULTS.filter((r) => r.is_featured);
      }
      return MOCK_RESULTS;
    }
    return data;
  } catch {
    if (featuredOnly) {
      return MOCK_RESULTS.filter((r) => r.is_featured);
    }
    return MOCK_RESULTS;
  }
}

export async function getResultStatistics() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('result_statistics')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return MOCK_RESULT_STATISTICS;
    return data;
  } catch {
    return MOCK_RESULT_STATISTICS;
  }
}

export async function getAllResults() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('results').
  select('*').
  order('created_at', { ascending: false });
  if (error) return [];
  return data || [];
}