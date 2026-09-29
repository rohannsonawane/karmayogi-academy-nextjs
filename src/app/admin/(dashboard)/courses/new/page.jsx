import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createCourse } from '@/lib/actions/admin-courses';
import CourseForm from '../CourseForm';

export const metadata = { title: 'New Course' };

export default async function NewCoursePage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('course_categories').select('*').order('display_order');

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/courses" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>New Course</h1>
        </div>
      </div>
      <CourseForm categories={categories || []} onSubmit={createCourse} />
    </div>
  );
}
