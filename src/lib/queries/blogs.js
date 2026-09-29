import { createClient } from '@/lib/supabase/server';
import { MOCK_BLOGS, MOCK_BLOG_CATEGORIES } from '@/lib/data/mockData';

export async function getBlogs(options) {
  try {
    const supabase = await createClient();
    let query = supabase
      .from('blogs')
      .select('*, blog_categories(id, name, slug)')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (options?.categorySlug && options.categorySlug !== 'all') {
      query = query.eq('blog_categories.slug', options.categorySlug);
    }
    if (options?.search) {
      query = query.ilike('title', `%${options.search}%`);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let res = MOCK_BLOGS;
      if (options?.categorySlug && options.categorySlug !== 'all') {
        res = res.filter((b) => b.category_slug === options.categorySlug);
      }
      if (options?.search) {
        const q = options.search.toLowerCase();
        res = res.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q));
      }
      if (options?.limit) {
        res = res.slice(0, options.limit);
      }
      return res;
    }
    return data;
  } catch {
    let res = MOCK_BLOGS;
    if (options?.categorySlug && options.categorySlug !== 'all') {
      res = res.filter((b) => b.category_slug === options.categorySlug);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      res = res.filter((b) => b.title.toLowerCase().includes(q) || b.excerpt?.toLowerCase().includes(q));
    }
    if (options?.limit) {
      res = res.slice(0, options.limit);
    }
    return res;
  }
}

export async function getBlogBySlug(slug) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('*, blog_categories(id, name, slug)')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    if (error || !data) {
      return MOCK_BLOGS.find((b) => b.slug === slug) || null;
    }
    return data;
  } catch {
    return MOCK_BLOGS.find((b) => b.slug === slug) || null;
  }
}

export async function getBlogCategories() {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blog_categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error || !data || data.length === 0) return MOCK_BLOG_CATEGORIES;
    return data;
  } catch {
    return MOCK_BLOG_CATEGORIES;
  }
}

export async function getAllBlogs() {
  const supabase = await createClient();
  const { data, error } = await supabase.
  from('blogs').
  select('*, blog_categories(id, name, slug)').
  order('created_at', { ascending: false });
  if (error) {
    console.error('Error fetching all blogs:', error);
    return [];
  }
  return data || [];
}