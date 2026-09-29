'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import SlugInput from '@/components/admin/SlugInput';
import RichEditor from '@/components/admin/RichEditor';
import toast from 'react-hot-toast';

export default function BlogForm({ categories, onSubmit, initialData = null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    // Handle checkbox — ensure 'false' is submitted when unchecked
    const isPublishedEl = e.target.querySelector('[name="is_published"][type="checkbox"]');
    formData.set('is_published', isPublishedEl?.checked ? 'true' : 'false');

    formData.set('content', content);

    startTransition(async () => {
      const result = await onSubmit(null, formData);
      if (result?.success) {
        toast.success(result.message);
        router.push('/admin/blogs');
        router.refresh();
      } else {
        toast.error(result?.message || 'Something went wrong.');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main */}
        <div>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="form-label">Post Title *</label>
              <input
                className="form-input"
                name="title"
                required
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="e.g. MPSC Rajyaseva 2025 Syllabus Guide"
                style={{ fontSize: '1.125rem', fontWeight: 600 }}
              />
            </div>
            <SlugInput name="slug" titleValue={title} defaultValue={initialData?.slug || ''} />
          </div>

          {/* Content Editor */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Content</h2>
            <RichEditor value={content} onChange={setContent} placeholder="Start writing your post..." />
          </div>

          {/* Excerpt */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Excerpt</h2>
            <textarea
              className="form-input"
              name="excerpt"
              rows={3}
              defaultValue={initialData?.excerpt || ''}
              placeholder="Short summary shown in blog cards and search results..."
              style={{ resize: 'vertical' }}
            />
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
        <div style={{ position: 'sticky', top: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Publish */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1rem' }}>Publish</h2>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', marginBottom: '1.25rem' }}>
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={initialData?.is_published ?? false}
                style={{ width: 16, height: 16, accentColor: 'var(--blue)' }}
              />
              <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--gray-700)' }}>Publish immediately</span>
            </label>
            <button type="submit" disabled={isPending} style={{
              width: '100%', padding: '0.75rem', background: isPending ? 'rgba(244,90,10,0.5)' : 'var(--orange)',
              border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, fontSize: '0.9375rem', cursor: isPending ? 'not-allowed' : 'pointer',
            }}>
              {isPending ? 'Saving…' : (initialData ? 'Save Changes' : 'Create Post')}
            </button>
            <button type="button" onClick={() => router.push('/admin/blogs')} style={{ width: '100%', marginTop: '0.5rem', padding: '0.625rem', background: 'transparent', border: '1.5px solid var(--gray-200)', borderRadius: '8px', color: 'var(--gray-600)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}>
              Cancel
            </button>
          </div>

          {/* Category */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem' }}>
            <label className="form-label">Category</label>
            <select name="category_id" className="form-input" defaultValue={initialData?.category_id || ''}>
              <option value="">No category</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          {/* Author & Image */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <label className="form-label">Author</label>
              <input className="form-input" name="author" defaultValue={initialData?.author || 'Karmayogi Academy'} />
            </div>
            <div>
              <label className="form-label">Featured Image URL</label>
              <input className="form-input" name="featured_image" defaultValue={initialData?.featured_image || ''} placeholder="https://..." />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
