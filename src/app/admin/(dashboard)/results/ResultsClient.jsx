'use client';

import { useState, useTransition } from 'react';
import { createResult, updateResult, toggleResultPublish, deleteResult } from '@/lib/actions/admin-results';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Plus, X, Pencil, Eye, EyeOff, Trash2 } from 'lucide-react';

export default function ResultsClient({ results = [] }) {
  const [showForm, setShowForm] = useState(false);
  const [editingResult, setEditingResult] = useState(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const openCreate = () => {
    setEditingResult(null);
    setShowForm(true);
  };

  const openEdit = (result) => {
    setEditingResult(result);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingResult(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const featuredEl = e.target.querySelector('[name="is_featured"][type="checkbox"]');
    const publishedEl = e.target.querySelector('[name="is_published"][type="checkbox"]');
    formData.set('is_featured', featuredEl?.checked ? 'true' : 'false');
    formData.set('is_published', publishedEl?.checked ? 'true' : 'false');

    startTransition(async () => {
      let result;
      if (editingResult) {
        result = await updateResult(editingResult.id, null, formData);
      } else {
        result = await createResult(null, formData);
      }
      if (result?.success) {
        toast.success(result.message);
        closeForm();
        router.refresh();
      } else {
        toast.error(result?.message || 'Error');
      }
    });
  };

  const handleTogglePublish = (id, currentStatus) => {
    startTransition(async () => {
      await toggleResultPublish(id, currentStatus);
      router.refresh();
    });
  };

  const handleDelete = (id, studentName) => {
    if (!confirm(`Delete result for "${studentName}"?`)) return;
    startTransition(async () => {
      await deleteResult(id);
      toast.success('Result deleted.');
      router.refresh();
    });
  };

  const isEditing = !!editingResult;

  return (
    <>
      <button
        onClick={openCreate}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
      >
        <Plus size={16} /> Add Result
      </button>

      {/* Results Table */}
      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden', marginTop: '1.5rem' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--light-bg)' }}>
                {['Student', 'Exam', 'Post Secured', 'Rank', 'Year', 'Featured', 'Published', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {results.map((r, i) => (
                <tr key={r.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{r.student_name}</td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)' }}>{r.exam}</td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-700)' }}>{r.post_secured}</td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{r.result_rank || '—'}</td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-500)' }}>{r.year || '—'}</td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: r.is_featured ? '#f59e0b' : 'var(--gray-400)' }}>
                      {r.is_featured ? '★ Yes' : '—'}
                    </span>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <button
                      onClick={() => handleTogglePublish(r.id, r.is_published)}
                      disabled={isPending}
                      style={{ border: 'none', background: 'none', cursor: isPending ? 'not-allowed' : 'pointer', color: r.is_published ? '#16a34a' : 'var(--gray-400)' }}
                    >
                      {r.is_published ? <Eye size={16} /> : <EyeOff size={16} />}
                    </button>
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openEdit(r)}
                        style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: 'var(--light-bg)', color: 'var(--navy)', border: 'none', cursor: 'pointer' }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        onClick={() => handleDelete(r.id, r.student_name)}
                        disabled={isPending}
                        style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: '#fee2e2', color: '#991b1b', border: 'none', cursor: isPending ? 'not-allowed' : 'pointer' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {results.length === 0 && (
                <tr><td colSpan={8} style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>No results yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showForm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', padding: '1.5rem', width: '100%', maxWidth: 540, maxHeight: '90vh', overflowY: 'auto', position: 'relative' }}>
            <button onClick={closeForm} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}>
              <X size={20} />
            </button>
            <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '1.25rem' }}>
              {isEditing ? 'Edit Result' : 'Add Result'}
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              <div>
                <label className="form-label">Student Name *</label>
                <input className="form-input" name="student_name" required placeholder="e.g. Priya Sharma" defaultValue={editingResult?.student_name || ''} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Exam *</label>
                  <input className="form-input" name="exam" required placeholder="e.g. Rajyaseva" defaultValue={editingResult?.exam || ''} />
                </div>
                <div>
                  <label className="form-label">Post Secured *</label>
                  <input className="form-input" name="post_secured" required placeholder="e.g. Deputy Collector" defaultValue={editingResult?.post_secured || ''} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Batch</label>
                  <input className="form-input" name="batch" placeholder="e.g. 2023-24" defaultValue={editingResult?.batch || ''} />
                </div>
                <div>
                  <label className="form-label">Year</label>
                  <input type="number" className="form-input" name="year" placeholder="2024" defaultValue={editingResult?.year || ''} />
                </div>
                <div>
                  <label className="form-label">Rank</label>
                  <input className="form-input" name="result_rank" placeholder="e.g. AIR 12" defaultValue={editingResult?.result_rank || ''} />
                </div>
              </div>
              <div>
                <label className="form-label">Photo URL</label>
                <input className="form-input" name="photo_url" placeholder="https://..." defaultValue={editingResult?.photo_url || ''} />
              </div>
              <div>
                <label className="form-label">Quote (optional)</label>
                <textarea className="form-input" name="quote" rows={2} placeholder="Student's success quote..." style={{ resize: 'vertical' }} defaultValue={editingResult?.quote || ''} />
              </div>
              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  <input type="checkbox" name="is_published" defaultChecked={editingResult ? editingResult.is_published : true} style={{ accentColor: 'var(--blue)' }} /> Published
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: 500 }}>
                  <input type="checkbox" name="is_featured" defaultChecked={editingResult?.is_featured || false} style={{ accentColor: 'var(--orange)' }} /> Featured
                </label>
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                <button type="submit" disabled={isPending} style={{ flex: 1, padding: '0.75rem', background: 'var(--orange)', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer' }}>
                  {isPending ? 'Saving…' : isEditing ? 'Update Result' : 'Add Result'}
                </button>
                <button type="button" onClick={closeForm} style={{ padding: '0.75rem 1.25rem', background: 'transparent', border: '1.5px solid var(--gray-200)', borderRadius: '8px', color: 'var(--gray-600)', fontWeight: 500, cursor: 'pointer' }}>
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
