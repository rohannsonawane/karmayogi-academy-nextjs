'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createFaculty(prevState, formData) {
  const supabase = await createClient();
  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    photo_url: formData.get('photo_url') || null,
    designation: formData.get('designation') || null,
    subject: formData.get('subject') || null,
    experience: formData.get('experience') || null,
    description: formData.get('description') || null,
    badge: formData.get('badge') || null,
    is_founder: formData.get('is_founder') === 'true',
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = await supabase.from('faculty').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/faculty');
  revalidatePath('/faculty');
  return { success: true, message: 'Faculty member created.' };
}

export async function updateFaculty(id, prevState, formData) {
  const supabase = await createClient();
  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    photo_url: formData.get('photo_url') || null,
    designation: formData.get('designation') || null,
    subject: formData.get('subject') || null,
    experience: formData.get('experience') || null,
    description: formData.get('description') || null,
    badge: formData.get('badge') || null,
    is_founder: formData.get('is_founder') === 'true',
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = await supabase.from('faculty').update(payload).eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/faculty');
  revalidatePath('/faculty');
  return { success: true, message: 'Faculty member updated.' };
}

export async function toggleFacultyPublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('faculty').update({ is_published: !currentStatus }).eq('id', id);
  revalidatePath('/admin/faculty');
  revalidatePath('/faculty');
}

export async function deleteFaculty(id) {
  const supabase = await createClient();
  await supabase.from('faculty').delete().eq('id', id);
  revalidatePath('/admin/faculty');
  revalidatePath('/faculty');
}
