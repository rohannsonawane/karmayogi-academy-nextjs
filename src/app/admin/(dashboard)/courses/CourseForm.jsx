'use client';

import { useState, useTransition, useActionState } from 'react';
import { useRouter } from 'next/navigation';
import SlugInput from '@/components/admin/SlugInput';
import { Plus, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function CourseForm({ categories, onSubmit, initialData = null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialData?.title || '');
  const [features, setFeatures] = useState(initialData?.course_features?.map(f => f.feature) || ['']);
  const [curriculum, setCurriculum] = useState(
    initialData?.course_curriculum?.map(c => ({ title: c.title, desc: c.description || '' })) || [{ title: '', desc: '' }]
  );

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (i) => setFeatures(features.filter((_, idx) => idx !== i));
  const updateFeature = (i, val) => setFeatures(features.map((f, idx) => idx === i ? val : f));

  const addCurriculum = () => setCurriculum([...curriculum, { title: '', desc: '' }]);
  const removeCurriculum = (i) => setCurriculum(curriculum.filter((_, idx) => idx !== i));
  const updateCurriculum = (i, field, val) => setCurriculum(curriculum.map((c, idx) => idx === i ? { ...c, [field]: val } : c));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    features.forEach(f => { if (f.trim()) formData.append('features', f); });
    curriculum.forEach(c => {
      if (c.title.trim()) {
        formData.append('curriculum_title', c.title);
        formData.append('curriculum_desc', c.desc);
      }
    });

    startTransition(async () => {
      const result = await onSubmit(null, formData);
      if (result?.success) {
        toast.success(result.message);
        router.push('/admin/courses');
        router.refresh();
      } else {
        toast.error(result?.message || 'Something went wrong.');
      }
    });
  };

  const fieldStyle = { marginBottom: '1.25rem' };
  const inputStyle = {
    width: '100%',
    padding: '0.625rem 0.875rem',
    border: '1.5px solid var(--gray-200)',
    borderRadius: '0.375rem',
    fontSize: '0.9375rem',
    color: 'var(--gray-800)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main */}
        <div>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem' }}>Course Details</h2>

            <div style={fieldStyle}>
              <label className="form-label">Course Title *</label>
              <input className="form-input" name="title" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Rajyaseva Pre + Mains Batch" />
            </div>

            <SlugInput name="slug" titleValue={title} defaultValue={initialData?.slug || ''} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
              <div>
                <label className="form-label">Category</label>
                <select name="category_id" className="form-input" defaultValue={initialData?.category_id || ''}>
                  <option value="">No category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="form-label">Duration</label>
                <input className="form-input" name="duration" defaultValue={initialData?.duration || ''} placeholder="e.g. 12 Months" />
              </div>
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Short Description</label>
              <textarea className="form-input" name="short_description" rows={2} defaultValue={initialData?.short_description || ''} placeholder="Brief tagline shown on course cards..." style={{ resize: 'vertical' }} />
            </div>

            <div style={{ marginTop: '1.25rem' }}>
              <label className="form-label">Full Description</label>
              <textarea className="form-input" name="description" rows={5} defaultValue={initialData?.description || ''} placeholder="Detailed course description..." style={{ resize: 'vertical' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1.25rem' }}>
              <div>
                <label className="form-label">Image URL</label>
                <input className="form-input" name="image_url" defaultValue={initialData?.image_url || ''} placeholder="https://..." />
              </div>
              <div>
                <label className="form-label">Syllabus PDF URL</label>
                <input className="form-input" name="syllabus_url" defaultValue={initialData?.syllabus_url || ''} placeholder="https://..." />
              </div>
            </div>
          </div>

          {/* Course Features */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Course Features</h2>
            {features.map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.625rem' }}>
                <input value={f} onChange={e => updateFeature(i, e.target.value)} placeholder={`Feature ${i + 1}...`} style={{ ...inputStyle, flex: 1 }} />
                <button type="button" onClick={() => removeFeature(i)} style={{ padding: '0 0.5rem', background: '#fee2e2', border: 'none', borderRadius: '6px', color: '#991b1b', cursor: 'pointer' }}>
                  <X size={14} />
                </button>
              </div>
            ))}
            <button type="button" onClick={addFeature} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, padding: '0.25rem 0' }}>
              <Plus size={14} /> Add Feature
            </button>
          </div>

          {/* Curriculum */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Curriculum</h2>
            {curriculum.map((c, i) => (
              <div key={i} style={{ background: 'var(--light-bg)', borderRadius: '8px', padding: '0.875rem', marginBottom: '0.75rem', position: 'relative' }}>
                <button type="button" onClick={() => removeCurriculum(i)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-400)' }}>
                  <X size={14} />
                </button>
                <input value={c.title} onChange={e => updateCurriculum(i, 'title', e.target.value)} placeholder={`Module ${i + 1} title...`} style={{ ...inputStyle, marginBottom: '0.5rem' }} />
                <input value={c.desc} onChange={e => updateCurriculum(i, 'desc', e.target.value)} placeholder="Description (optional)..." style={inputStyle} />
              </div>
            ))}
            <button type="button" onClick={addCurriculum} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--blue)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500, padding: '0.25rem 0' }}>
              <Plus size={14} /> Add Module
            </button>
          </div>

          {/* SEO */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>SEO</h2>
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">SEO Title</label>
              <input className="form-input" name="seo_title" defaultValue={initialData?.seo_title || ''} />
            </div>
            <div>
              <label className="form-label">SEO Description</label>
              <textarea className="form-input" name="seo_description" rows={2} defaultValue={initialData?.seo_description || ''} style={{ resize: 'vertical' }} />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ position: 'sticky', top: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Publish Settings</h2>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Admission Status</label>
              <select name="admission_status" className="form-input" defaultValue={initialData?.admission_status || 'open'}>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
                <option value="upcoming">Upcoming</option>
                <option value="limited">Limited Seats</option>
              </select>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Display Order</label>
              <input type="number" className="form-input" name="display_order" defaultValue={initialData?.display_order || 0} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                <input type="hidden" name="is_published" value="false" />
                <input type="checkbox" name="is_published" value="true" defaultChecked={initialData?.is_published ?? true} style={{ width: 16, height: 16, accentColor: 'var(--blue)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-700)' }}>Published</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer' }}>
                <input type="hidden" name="is_featured" value="false" />
                <input type="checkbox" name="is_featured" value="true" defaultChecked={initialData?.is_featured ?? false} style={{ width: 16, height: 16, accentColor: 'var(--orange)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-700)' }}>Featured on Homepage</span>
              </label>
            </div>

            <button type="submit" disabled={isPending} style={{
              width: '100%',
              padding: '0.75rem',
              background: isPending ? 'rgba(244,90,10,0.5)' : 'var(--orange)',
              border: 'none',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9375rem',
              cursor: isPending ? 'not-allowed' : 'pointer',
            }}>
              {isPending ? 'Saving…' : (initialData ? 'Save Changes' : 'Create Course')}
            </button>
            <button type="button" onClick={() => router.push('/admin/courses')} style={{ width: '100%', marginTop: '0.5rem', padding: '0.625rem', background: 'transparent', border: '1.5px solid var(--gray-200)', borderRadius: '8px', color: 'var(--gray-600)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
