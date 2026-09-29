'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createTestimonial(prevState, formData) {
  const supabase = await createClient();
  const payload = {
    student_name: formData.get('student_name'),
    photo_url: formData.get('photo_url') || null,
    course: formData.get('course') || null,
    review: formData.get('review'),
    rating: Number(formData.get('rating') || 5),
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = await supabase.from('testimonials').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true, message: 'Testimonial created.' };
}

export async function updateTestimonial(id, prevState, formData) {
  const supabase = await createClient();
  const payload = {
    student_name: formData.get('student_name'),
    photo_url: formData.get('photo_url') || null,
    course: formData.get('course') || null,
    review: formData.get('review'),
    rating: Number(formData.get('rating') || 5),
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = await supabase.from('testimonials').update(payload).eq('id', id);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
  return { success: true, message: 'Testimonial updated.' };
}

export async function toggleTestimonialPublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('testimonials').update({ is_published: !currentStatus }).eq('id', id);
  revalidatePath('/admin/testimonials');
  revalidatePath('/');
}

export async function deleteTestimonial(id) {
  const supabase = await createClient();
  await supabase.from('testimonials').delete().eq('id', id);
  revalidatePath('/admin/testimonials');
}
