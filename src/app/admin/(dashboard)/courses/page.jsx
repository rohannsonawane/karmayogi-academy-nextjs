import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  toggleCoursePublish, toggleCourseFeatured, deleteCourse,
} from '@/lib/actions/admin-courses';
import { Plus, Pencil, Star, Eye, EyeOff, Trash2 } from 'lucide-react';
import DeleteConfirmButton from '@/components/admin/DeleteConfirmButton';

export const metadata = { title: 'Courses' };

const ADMISSION_COLORS = {
  open: { bg: '#dcfce7', text: '#166534' },
  closed: { bg: '#fee2e2', text: '#991b1b' },
  upcoming: { bg: '#e0f2fe', text: '#075985' },
  limited: { bg: '#fef9c3', text: '#854d0e' },
};

export default async function CoursesAdminPage() {
  const supabase = await createClient();
  const { data: courses } = await supabase
    .from('courses')
    .select('*, course_categories(name)')
    .order('display_order', { ascending: true });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Courses</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{courses?.length || 0} courses total</p>
        </div>
        <Link href="/admin/courses/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
          <Plus size={16} /> New Course
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--light-bg)' }}>
                {['Title', 'Category', 'Status', 'Featured', 'Published', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(courses || []).map((course, i) => {
                const sc = ADMISSION_COLORS[course.admission_status] || ADMISSION_COLORS.open;
                return (
                  <tr key={course.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--navy)' }}>{course.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: 'monospace', marginTop: '2px' }}>/{course.slug}</div>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                      {course.course_categories?.name || '—'}
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ background: sc.bg, color: sc.text, padding: '0.2rem 0.6rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
                        {course.admission_status}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <form action={async () => { 'use server'; await toggleCourseFeatured(course.id, course.is_featured); }}>
                        <button type="submit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: course.is_featured ? '#f59e0b' : 'var(--gray-300)', padding: '4px' }}>
                          <Star size={18} fill={course.is_featured ? '#f59e0b' : 'none'} />
                        </button>
                      </form>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <form action={async () => { 'use server'; await toggleCoursePublish(course.id, course.is_published); }}>
                        <button type="submit" style={{ border: 'none', background: 'none', cursor: 'pointer', color: course.is_published ? '#16a34a' : 'var(--gray-400)', padding: '4px' }}>
                          {course.is_published ? <Eye size={18} /> : <EyeOff size={18} />}
                        </button>
                      </form>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <Link href={`/admin/courses/${course.id}/edit`} style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: 'var(--light-bg)', color: 'var(--navy)', textDecoration: 'none' }}>
                          <Pencil size={14} />
                        </Link>
                        <form action={async () => { 'use server'; await deleteCourse(course.id); }}>
                          <DeleteConfirmButton itemType="course" />
                        </form>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {(!courses || courses.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                    No courses yet. <Link href="/admin/courses/new" style={{ color: 'var(--blue)' }}>Create the first one</Link>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
