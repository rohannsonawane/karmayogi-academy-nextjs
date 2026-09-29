'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateEnquiryStatus(id, status) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('enquiries')
    .update({ status })
    .eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/enquiries');
  return { success: true };
}

export async function updateEnquiryNotes(prevState, formData) {
  const supabase = await createClient();
  const id = formData.get('id');
  const notes = formData.get('notes');
  const { error } = await supabase
    .from('enquiries')
    .update({ notes })
    .eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/enquiries');
  return { success: true, message: 'Notes saved.' };
}

export async function deleteEnquiry(id) {
  const supabase = await createClient();
  await supabase.from('enquiries').delete().eq('id', id);
  revalidatePath('/admin/enquiries');
}
