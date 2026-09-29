'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ---- Categories ----
export async function getCourseCategories() {
  const supabase = await createClient();
  const { data } = await supabase.from('course_categories').select('*').order('display_order');
  return data || [];
}

export async function upsertCourseCategory(prevState, formData) {
  const supabase = await createClient();
  const id = formData.get('id');
  const payload = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    display_order: Number(formData.get('display_order') || 0),
  };
  const { error } = id
    ? await supabase.from('course_categories').update(payload).eq('id', id)
    : await supabase.from('course_categories').insert(payload);
  if (error) return { success: false, message: error.message };
  revalidatePath('/admin/courses');
  return { success: true, message: 'Category saved.' };
}

// ---- Courses ----
export async function createCourse(prevState, formData) {
  const supabase = await createClient();

  const features = formData.getAll('features').filter(Boolean);
  const curriculumTitles = formData.getAll('curriculum_title').filter(Boolean);
  const curriculumDescs = formData.getAll('curriculum_desc');

  const coursePayload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    short_description: formData.get('short_description') || null,
    description: formData.get('description') || null,
    duration: formData.get('duration') || null,
    image_url: formData.get('image_url') || null,
    syllabus_url: formData.get('syllabus_url') || null,
    admission_status: formData.get('admission_status') || 'open',
    is_featured: formData.get('is_featured') === 'true',
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
    seo_title: formData.get('seo_title') || null,
    seo_description: formData.get('seo_description') || null,
  };

  const { data: course, error } = await supabase
    .from('courses')
    .insert(coursePayload)
    .select()
    .single();

  if (error) return { success: false, message: error.message };

  // Insert features
  if (features.length > 0) {
    await supabase.from('course_features').insert(
      features.map((f, i) => ({ course_id: course.id, feature: f, display_order: i }))
    );
  }

  // Insert curriculum
  if (curriculumTitles.length > 0) {
    await supabase.from('course_curriculum').insert(
      curriculumTitles.map((t, i) => ({
        course_id: course.id,
        title: t,
        description: curriculumDescs[i] || null,
        display_order: i,
      }))
    );
  }

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return { success: true, message: 'Course created successfully.', id: course.id };
}

export async function updateCourse(id, prevState, formData) {
  const supabase = await createClient();

  const features = formData.getAll('features').filter(Boolean);
  const curriculumTitles = formData.getAll('curriculum_title').filter(Boolean);
  const curriculumDescs = formData.getAll('curriculum_desc');

  const coursePayload = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    category_id: formData.get('category_id') || null,
    short_description: formData.get('short_description') || null,
    description: formData.get('description') || null,
    duration: formData.get('duration') || null,
    image_url: formData.get('image_url') || null,
    syllabus_url: formData.get('syllabus_url') || null,
    admission_status: formData.get('admission_status') || 'open',
    is_featured: formData.get('is_featured') === 'true',
    is_published: formData.get('is_published') === 'true',
    display_order: Number(formData.get('display_order') || 0),
    seo_title: formData.get('seo_title') || null,
    seo_description: formData.get('seo_description') || null,
  };

  const { error } = await supabase.from('courses').update(coursePayload).eq('id', id);
  if (error) return { success: false, message: error.message };

  // Replace features & curriculum
  await supabase.from('course_features').delete().eq('course_id', id);
  await supabase.from('course_curriculum').delete().eq('course_id', id);

  if (features.length > 0) {
    await supabase.from('course_features').insert(
      features.map((f, i) => ({ course_id: id, feature: f, display_order: i }))
    );
  }
  if (curriculumTitles.length > 0) {
    await supabase.from('course_curriculum').insert(
      curriculumTitles.map((t, i) => ({
        course_id: id,
        title: t,
        description: curriculumDescs[i] || null,
        display_order: i,
      }))
    );
  }

  revalidatePath('/admin/courses');
  revalidatePath('/courses');
  return { success: true, message: 'Course updated successfully.' };
}

export async function toggleCoursePublish(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('courses').update({ is_published: !currentStatus }).eq('id', id);
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
}

export async function toggleCourseFeatured(id, currentStatus) {
  const supabase = await createClient();
  await supabase.from('courses').update({ is_featured: !currentStatus }).eq('id', id);
  revalidatePath('/admin/courses');
  revalidatePath('/');
}

export async function deleteCourse(id) {
  const supabase = await createClient();
  await supabase.from('courses').delete().eq('id', id);
  revalidatePath('/admin/courses');
  revalidatePath('/courses');
}
