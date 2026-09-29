'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ---- Result Statistics ----
export async function upsertResultStat(prevState, formData) {
  const supabase = await createClient();
  const id = formData.get('id');
  const payload = {
    label: formData.get('label'),
    value: formData.get('value'),
    description: formData.get('description') || null,
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = id
    ? await supabase.from('result_statistics').update(payload).eq('id', id)
    : await supabase.from('result_statistics').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/results/statistics');
  revalidatePath('/');
  return { success: true, message: 'Statistic saved.' };
}

export async function deleteResultStat(id) {
  const supabase = await createClient();
  await supabase.from('result_statistics').delete().eq('id', id);
  revalidatePath('/admin/results/statistics');
  revalidatePath('/');
}

// ---- Results (Achievers) ----
export async function createResult(prevState, formData) {
  const supabase = await createClient();
  const payload = {
    student_name: formData.get('student_name'),
    photo_url: formData.get('photo_url') || null,
    exam: formData.get('exam'),
    post_secured: formData.get('post_secured'),
    batch: formData.get('batch') || null,
    year: formData.get('year') ? Number(formData.get('year')) : null,
    result_rank: formData.get('result_rank') || null,
    quote: formData.get('quote') || null,
    is_featured: formData.get('is_featured') === 'true',
    is_published: formData.get('is_published') === 'true',
  };
  const { error } = await supabase.from('results').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/results');
  revalidatePath('/results');
  return { success: true, message: 'Result created.' };
}

export async function updateResult(id, prevState, formData) {
  const supabase = await createClient();
  const payload = {
    student_name: formData.get('student_name'),
    photo_url: formData.get('photo_url') || null,
    exam: formData.get('exam'),
    post_secured: formData.get('post_secured'),
    batch: formData.get('batch') || null,
    year: formData.get('year') ? Number(formData.get('year')) : null,
    result_rank: formData.get('result_rank') || null,
    quote: formData.get('quote') || null,
    is_featured: formData.get('is_featured') === 'true',
    is_published: formData.get('is_published') === 'true',
  };
  const { error } = await supabase.from('results').update(payload).eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/results');
  revalidatePath('/results');
  return { success: true, message: 'Result updated.' };
}

export async function toggleResultPublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('results').update({ is_published: !currentStatus }).eq('id', id);
  revalidatePath('/admin/results');
}

export async function deleteResult(id) {
  const supabase = await createClient();
  await supabase.from('results').delete().eq('id', id);
  revalidatePath('/admin/results');
}
