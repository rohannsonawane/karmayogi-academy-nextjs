'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createBlog(prevState, formData) {
  const supabase = await createClient();

  const payload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    featured_image: formData.get('featured_image') || null,
    excerpt: formData.get('excerpt') || null,
    content: formData.get('content') || null,
    author: formData.get('author') || 'Karmayogi Academy',
    is_published: formData.get('is_published') === 'true',
    published_at: formData.get('is_published') === 'true' ? new Date().toISOString() : null,
    seo_title: formData.get('seo_title') || null,
    seo_description: formData.get('seo_description') || null,
  };

  const { data: blog, error } = await supabase.from('blogs').insert(payload).select().single();
  if (error) return { success: false, message: error.message };

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  return { success: true, message: 'Blog post created.', id: blog.id };
}

export async function updateBlog(id, prevState, formData) {
  const supabase = await createClient();
  const isPublished = formData.get('is_published') === 'true';

  // Fetch current to preserve published_at if already set
  const { data: current } = await supabase.from('blogs').select('published_at, is_published').eq('id', id).single();

  const payload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    featured_image: formData.get('featured_image') || null,
    excerpt: formData.get('excerpt') || null,
    content: formData.get('content') || null,
    author: formData.get('author') || 'Karmayogi Academy',
    is_published: isPublished,
    published_at: isPublished
      ? (current?.published_at || new Date().toISOString())
      : null,
    seo_title: formData.get('seo_title') || null,
    seo_description: formData.get('seo_description') || null,
  };

  const { error } = await supabase.from('blogs').update(payload).eq('id', id);
  if (error) return { success: false, message: error.message };

  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
  revalidatePath(`/blog/${payload.slug}`);
  return { success: true, message: 'Blog post updated.' };
}

export async function toggleBlogPublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('blogs').update({
    is_published: !currentStatus,
    published_at: !currentStatus ? new Date().toISOString() : null,
  }).eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}

export async function deleteBlog(id) {
  const supabase = await createClient();
  await supabase.from('blogs').delete().eq('id', id);
  revalidatePath('/admin/blogs');
  revalidatePath('/blog');
}

export async function upsertBlogCategory(prevState, formData) {
  const supabase = await createClient();
  const id = formData.get('id');
  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = id
    ? await supabase.from('blog_categories').update(payload).eq('id', id)
    : await supabase.from('blog_categories').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/blogs');
  return { success: true, message: 'Category saved.' };
}
