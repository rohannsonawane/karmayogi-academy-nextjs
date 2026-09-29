'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createResource(prevState, formData) {
  const supabase = await createClient();
  const payload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    target_exam: formData.get('target_exam') || null,
    description: formData.get('description') || null,
    file_url: formData.get('file_url') || null,
    is_published: formData.get('is_published') === 'true',
  };
  const { error } = await supabase.from('resources').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/resources');
  revalidatePath('/resources');
  return { success: true, message: 'Resource created.' };
}

export async function updateResource(id, prevState, formData) {
  const supabase = await createClient();
  const payload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    target_exam: formData.get('target_exam') || null,
    description: formData.get('description') || null,
    file_url: formData.get('file_url') || null,
    is_published: formData.get('is_published') === 'true',
  };
  const { error } = await supabase.from('resources').update(payload).eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/resources');
  revalidatePath('/resources');
  return { success: true, message: 'Resource updated.' };
}

export async function toggleResourcePublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('resources').update({ is_published: !currentStatus }).eq('id', id);
  revalidatePath('/admin/resources');
}

export async function deleteResource(id) {
  const supabase = await createClient();
  await supabase.from('resources').delete().eq('id', id);
  revalidatePath('/admin/resources');
}

export async function upsertResourceCategory(prevState, formData) {
  const supabase = await createClient();
  const id = formData.get('id');
  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = id
    ? await supabase.from('resource_categories').update(payload).eq('id', id)
    : await supabase.from('resource_categories').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/resources');
  return { success: true, message: 'Category saved.' };
}
