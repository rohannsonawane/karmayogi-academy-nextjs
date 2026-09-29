'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import SlugInput from '@/components/admin/SlugInput';
import toast from 'react-hot-toast';

export default function FacultyForm({ onSubmit, initialData = null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [name, setName] = useState(initialData?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const founderEl = e.target.querySelector('[name="is_founder"][type="checkbox"]');
    const publishedEl = e.target.querySelector('[name="is_published"][type="checkbox"]');
    formData.set('is_founder', founderEl?.checked ? 'true' : 'false');
    formData.set('is_published', publishedEl?.checked ? 'true' : 'false');

    startTransition(async () => {
      const result = await onSubmit(null, formData);
      if (result?.success) {
        toast.success(result.message);
        router.push('/admin/faculty');
        router.refresh();
      } else {
        toast.error(result?.message || 'Something went wrong.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem' }}>Faculty Details</h2>

            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Full Name *</label>
              <input className="form-input" name="name" required value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dr. Ramesh Patil" />
            </div>

            <SlugInput name="slug" titleValue={name} defaultValue={initialData?.slug || ''} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
              <div>
                <label className="form-label">Designation</label>
                <input className="form-input" name="designation" defaultValue={initialData?.designation || ''} placeholder="e.g. Deputy Collector (Retd.)" />
              </div>
              <div>
                <label className="form-label">Subject / Expertise</label>
                <input className="form-input" name="subject" defaultValue={initialData?.subject || ''} placeholder="e.g. History & Geography" />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
              <div>
                <label className="form-label">Experience</label>
                <input className="form-input" name="experience" defaultValue={initialData?.experience || ''} placeholder="e.g. 15+ Years" />
              </div>
              <div>
                <label className="form-label">Badge / Tag</label>
                <input className="form-input" name="badge" defaultValue={initialData?.badge || ''} placeholder="e.g. Post-Holder, Founder" />
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Photo URL</label>
              <input className="form-input" name="photo_url" defaultValue={initialData?.photo_url || ''} placeholder="https://..." />
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Description / Bio</label>
              <textarea className="form-input" name="description" rows={4} defaultValue={initialData?.description || ''} placeholder="About this faculty member..." style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        <div style={{ position: 'sticky', top: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Settings</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Display Order</label>
              <input type="number" className="form-input" name="display_order" defaultValue={initialData?.display_order || 0} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                <input type="checkbox" name="is_published" defaultChecked={initialData?.is_published ?? true} style={{ width: 16, height: 16, accentColor: 'var(--blue)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-700)' }}>Published</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                <input type="checkbox" name="is_founder" defaultChecked={initialData?.is_founder ?? false} style={{ width: 16, height: 16, accentColor: 'var(--orange)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-700)' }}>Founder / Director</span>
              </label>
            </div>

            <button type="submit" disabled={isPending} style={{ width: '100%', padding: '0.75rem', background: isPending ? 'rgba(244,90,10,0.5)' : 'var(--orange)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '0.9375rem', cursor: isPending ? 'not-allowed' : 'pointer' }}>
              {isPending ? 'Saving…' : (initialData ? 'Save Changes' : 'Add Faculty')}
            </button>
            <button type="button" onClick={() => router.push('/admin/faculty')} style={{ width: '100%', marginTop: '0.5rem', padding: '0.625rem', background: 'transparent', border: '1.5px solid var(--gray-200)', borderRadius: '8px', color: 'var(--gray-600)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
