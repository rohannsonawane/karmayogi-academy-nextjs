import { createClient } from '@/lib/supabase/server';
import { MOCK_COURSES, MOCK_COURSE_CATEGORIES } from '@/lib/data/mockData';

export async function getCourses(options) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('courses')
      .select('*, course_categories(id, name, slug)')
      .eq('is_published', true)
      .order('display_order', { ascending: true });

    if (options?.featured) {
      query = query.eq('is_featured', true);
    }
    if (options?.categorySlug && options.categorySlug !== 'all') {
      query = query.eq('course_categories.slug', options.categorySlug);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let res = MOCK_COURSES;
      if (options?.featured) {
        res = res.filter((c) => c.is_featured);
      }
      if (options?.categorySlug && options.categorySlug !== 'all') {
        res = res.filter((c) => c.category_slug === options.categorySlug);
      }
      if (options?.limit) {
        res = res.slice(0, options.limit);
      }
      return res;
    }
    return data;
  } catch {
    let res = MOCK_COURSES;
    if (options?.featured) {
      res = res.filter((c) => c.is_featured);
    }
    if (options?.categorySlug && options.categorySlug !== 'all') {
      res = res.filter((c) => c.category_slug === options.categorySlug);
    }
    if (options?.limit) {
      res = res.slice(0, options.limit);
    }
    return res;
  }
}

export async function getCourseBySlug(slug) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('courses')
      .select('*, course_categories(id, name, slug), course_features(*), course_curriculum(*)')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    if (error || !data) {
      return MOCK_COURSES.find((c) => c.slug === slug) || null;
    }
    return data;
  } catch {
    return MOCK_COURSES.find((c) => c.slug === slug) || null;
  }
}

export async function getCourseCategories() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('course_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) {
      return MOCK_COURSE_CATEGORIES;
    }
    return data;
  } catch {
    return MOCK_COURSE_CATEGORIES;
  }
}

// Admin: get all courses regardless of publish status
export async function getAllCourses() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('courses').
  select('*, course_categories(id, name, slug)').
  order('display_order', { ascending: true });
  if (error) {
    console.error('Error fetching all courses:', error);
    return [];
  }
  return data || [];
}