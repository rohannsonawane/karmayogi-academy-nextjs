import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { updateCourse } from '@/lib/actions/admin-courses';
import CourseForm from '../../CourseForm';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Course' };

export default async function EditCoursePage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: course }, { data: categories }] = await Promise.all([
    supabase.from('courses').select('*, course_features(*), course_curriculum(*)').eq('id', id).single(),
    supabase.from('course_categories').select('*').order('display_order'),
  ]);

  if (!course) notFound();

  const boundAction = updateCourse.bind(null, id);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/courses" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Edit Course</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{course.title}</p>
        </div>
      </div>
      <CourseForm categories={categories || []} onSubmit={boundAction} initialData={course} />
    </div>
  );
}
