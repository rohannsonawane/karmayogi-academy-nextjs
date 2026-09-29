import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { toggleFacultyPublish, deleteFaculty } from '@/lib/actions/admin-faculty';
import { Plus, Pencil, Eye, EyeOff, Trash2 } from 'lucide-react';

export const metadata = { title: 'Faculty' };

export default async function FacultyAdminPage() {
  const supabase = await createClient();
  const { data: faculty } = await supabase.from('faculty').select('*').order('display_order');

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Faculty</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{faculty?.length || 0} members</p>
        </div>
        <Link href="/admin/faculty/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
          <Plus size={16} /> Add Faculty
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
        {(faculty || []).map(member => (
          <div key={member.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
            <div style={{ height: 6, background: member.is_founder ? 'var(--gold)' : 'var(--blue)' }} />
            <div style={{ padding: '1.25rem' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'var(--gray-100)', overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)' }}>
                  {member.photo_url
                    ? <img src={member.photo_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : member.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem' }}>{member.name}</div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginTop: '2px' }}>{member.designation || member.subject || '—'}</div>
                  {member.badge && (
                    <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '0.1rem 0.4rem', borderRadius: '4px', background: 'rgba(244,90,10,0.1)', color: 'var(--orange)', marginTop: '4px', display: 'inline-block' }}>
                      {member.badge}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Link href={`/admin/faculty/${member.id}/edit`} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', background: 'var(--light-bg)', borderRadius: '6px', fontSize: '0.8125rem', color: 'var(--navy)', textDecoration: 'none', fontWeight: 500 }}>
                    <Pencil size={13} /> Edit
                  </Link>
                  <form action={async () => { 'use server'; await deleteFaculty(member.id); }}>
                    <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', background: '#fee2e2', borderRadius: '6px', fontSize: '0.8125rem', color: '#991b1b', border: 'none', cursor: 'pointer', fontWeight: 500 }}>
                      <Trash2 size={13} />
                    </button>
                  </form>
                </div>
                <form action={async () => { 'use server'; await toggleFacultyPublish(member.id, member.is_published); }}>
                  <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.625rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, background: member.is_published ? '#dcfce7' : '#f3f4f6', color: member.is_published ? '#166534' : '#6b7280' }}>
                    {member.is_published ? <><Eye size={12} /> Visible</> : <><EyeOff size={12} /> Hidden</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}
        {(!faculty || faculty.length === 0) && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem', color: 'var(--gray-400)' }}>
            No faculty yet. <Link href="/admin/faculty/new" style={{ color: 'var(--blue)' }}>Add the first member</Link>.
          </div>
        )}
      </div>
    </div>
  );
}
