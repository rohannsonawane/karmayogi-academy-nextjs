'use client';

import { useState, useTransition } from 'react';
import { createTestimonial } from '@/lib/actions/admin-testimonials';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Plus, X, Star } from 'lucide-react';

export default function TestimonialsClient() {
  const [showForm, setShowForm] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const publishedEl = e.target.querySelector('[name="is_published"][type="checkbox"]');
    formData.set('is_published', publishedEl?.checked ? 'true' : 'false');
    formData.set('rating', String(rating));

    startTransition(async () => {
      const result = await createTestimonial(null, formData);
      if (result?.success) {
        toast.success(result.message);
        setShowForm(false);
        setRating(5);
        router.refresh();
      } else {
        toast.error(result?.message || 'Error');
      }
    });
  };

  return (
    <>
      <button onClick={() => setShowForm(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}>
        <Plus size={16} /> Add Testimonial
      </button>

      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', width: '100%', maxWidth: 480, position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowForm(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
              <X size={20} />
            </button>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem' }}>Add Testimonial</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label className="form-label">Student Name *</label>
                <input className="form-input" name="student_name" required placeholder="e.g. Rahul Kadam" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Course</label>
                  <input className="form-input" name="course" placeholder="e.g. Rajyaseva Batch" />
                </div>
                <div>
                  <label className="form-label">Photo URL</label>
                  <input className="form-input" name="photo_url" placeholder="https://..." />
                </div>
              </div>
              <div>
                <label className="form-label">Review *</label>
                <textarea className="form-input" name="review" required rows={4} placeholder="Student's review..." style={{ resize: 'vertical' }} />
              </div>
              <div>
                <label className="form-label">Rating</label>
                <div style={{ display: 'flex', gap: '0.25rem' }}>
                  {[1,2,3,4,5].map(n => (
                    <button key={n} type="button" onClick={() => setRating(n)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: n <= rating ? '#f59e0b' : 'var(--gray-300)', padding: '2px' }}>
                      <Star size={24} fill={n <= rating ? '#f59e0b' : 'none'} />
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Display Order</label>
                  <input type="number" className="form-input" name="display_order" defaultValue={0} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', paddingBottom: '0.375rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                    <input type="checkbox" name="is_published" defaultChecked style={{ accentColor: 'var(--blue)' }} /> Publish immediately
                  </label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button type="submit" disabled={isPending} style={{ flex: 1, padding: '0.75rem', background: 'var(--orange)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer' }}>
                  {isPending ? 'Saving…' : 'Add Testimonial'}
                </button>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: '0.75rem 1.25rem', background: 'transparent', border: '1.5px solid var(--gray-200)', borderRadius: '8px', color: 'var(--gray-600)', fontWeight: 500, cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
