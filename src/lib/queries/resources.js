import { createClient } from '@/lib/supabase/server';
import { MOCK_RESOURCES, MOCK_RESOURCE_CATEGORIES } from '@/lib/data/mockData';

export async function getResources(options) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('resources')
      .select('*, resource_categories(id, name, slug)')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (options?.categorySlug && options.categorySlug !== 'all') {
      query = query.eq('resource_categories.slug', options.categorySlug);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let res = MOCK_RESOURCES;
      if (options?.categorySlug && options.categorySlug !== 'all') {
        res = res.filter((r) => r.category_slug === options.categorySlug);
      }
      if (options?.limit) {
        res = res.slice(0, options.limit);
      }
      return res;
    }
    return data;
  } catch {
    let res = MOCK_RESOURCES;
    if (options?.categorySlug && options.categorySlug !== 'all') {
      res = res.filter((r) => r.category_slug === options.categorySlug);
    }
    if (options?.limit) {
      res = res.slice(0, options.limit);
    }
    return res;
  }
}

export async function getResourceCategories() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('resource_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return MOCK_RESOURCE_CATEGORIES;
    return data;
  } catch {
    return MOCK_RESOURCE_CATEGORIES;
  }
}

export async function getAllResources() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('resources')
      .select('*, resource_categories(id, name, slug)')
      .order('created_at', { ascending: false });
    if (error || !data || data.length === 0) return MOCK_RESOURCES;
    return data;
  } catch {
    return MOCK_RESOURCES;
  }
}