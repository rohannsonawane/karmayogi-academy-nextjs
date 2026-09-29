import { createClient } from '@/lib/supabase/server';
import { toggleTestimonialPublish, deleteTestimonial } from '@/lib/actions/admin-testimonials';
import { Eye, EyeOff, Trash2, Star } from 'lucide-react';
import TestimonialsClient from './TestimonialsClient';

export const metadata = { title: 'Testimonials' };

export default async function TestimonialsAdminPage() {
  const supabase = await createClient();
  const { data: testimonials } = await supabase
    .from('testimonials')
    .select('*')
    .order('display_order', { ascending: true });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Testimonials</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{testimonials?.length || 0} reviews</p>
        </div>
        <TestimonialsClient />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {(testimonials || []).map(t => (
          <div key={t.id} style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem' }}>{t.student_name}</div>
                {t.course && <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginTop: '2px' }}>{t.course}</div>}
              </div>
              <div style={{ display: 'flex', color: '#f59e0b' }}>
                {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" />)}
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6, flex: 1 }}>
              &ldquo;{t.review.length > 150 ? t.review.substring(0, 150) + '…' : t.review}&rdquo;
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <form action={async () => { 'use server'; await toggleTestimonialPublish(t.id, t.is_published); }}>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.3rem 0.625rem', borderRadius: '6px', border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, background: t.is_published ? '#dcfce7' : '#f3f4f6', color: t.is_published ? '#166534' : '#6b7280' }}>
                  {t.is_published ? <><Eye size={12} /> Visible</> : <><EyeOff size={12} /> Hidden</>}
                </button>
              </form>
              <form action={async () => { 'use server'; await deleteTestimonial(t.id); }}>
                <button type="submit" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </form>
            </div>
          </div>
        ))}
        {(!testimonials || testimonials.length === 0) && (
          <div style={{ gridColumn: '1/-1', padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>No testimonials yet.</div>
        )}
      </div>
    </div>
  );
}
