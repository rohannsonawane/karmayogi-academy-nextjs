'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateAboutPage(prevState, formData) {
  const supabase = await createClient();

  const aboutPageStr = formData.get('about_page');
  if (!aboutPageStr) {
    return { success: false, message: 'No data received.' };
  }

  let about_page;
  try {
    about_page = JSON.parse(aboutPageStr);
  } catch (e) {
    console.error('Failed to parse about_page JSON', e);
    return { success: false, message: 'Invalid data format.' };
  }

  const { data: existing } = await supabase
    .from('site_settings')
    .select('id')
    .single();

  if (!existing) {
    return { success: false, message: 'Settings row not found. Please seed the database.' };
  }

  const { error } = await supabase
    .from('site_settings')
    .update({ about_page })
    .eq('id', existing.id);

  if (error) {
    console.error('About page update error:', error);
    return { success: false, message: 'Failed to update About page.' };
  }

  revalidatePath('/about');
  revalidatePath('/admin/about');
  return { success: true, message: 'About page updated successfully.' };
}
