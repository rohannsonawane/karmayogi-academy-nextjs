import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { updateFaculty } from '@/lib/actions/admin-faculty';
import FacultyForm from '../../FacultyForm';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Faculty' };

export default async function EditFacultyPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: member } = await supabase.from('faculty').select('*').eq('id', id).single();
  if (!member) notFound();
  const boundAction = updateFaculty.bind(null, id);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/faculty" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Edit Faculty</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{member.name}</p>
        </div>
      </div>
      <FacultyForm onSubmit={boundAction} initialData={member} />
    </div>
  );
}
