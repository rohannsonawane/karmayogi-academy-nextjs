'use client';

import { useState, useTransition } from 'react';
import { upsertResultStat, deleteResultStat } from '@/lib/actions/admin-results';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Check, X, GripVertical, Plus } from 'lucide-react';

// ── Inline Edit Row ──────────────────────────────────────────────────────────
function StatRow({ stat, index, onDeleted }) {
  const [editing, setEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [form, setForm] = useState({
    value: stat.value,
    label: stat.label,
    description: stat.description || '',
    display_order: stat.display_order ?? index,
  });

  const handleSave = () => {
    const fd = new FormData();
    fd.append('id', stat.id);
    Object.entries(form).forEach(([k, v]) => fd.append(k, String(v)));
    startTransition(async () => {
      const result = await upsertResultStat(null, fd);
      if (result?.success) {
        toast.success('Statistic updated!');
        setEditing(false);
        router.refresh();
      } else {
        toast.error(result?.message || 'Error saving');
      }
    });
  };

  const handleDelete = () => {
    if (!confirm(`Delete "${stat.label}"?`)) return;
    startTransition(async () => {
      await deleteResultStat(stat.id);
      toast.success('Deleted');
      router.refresh();
    });
  };

  if (editing) {
    return (
      <div style={{ padding: '1.25rem', borderTop: index > 0 ? '1px solid var(--border)' : 'none', background: '#fafbff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.875rem' }}>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Value *</label>
            <input className="form-input" value={form.value} onChange={e => setForm(f => ({ ...f, value: e.target.value }))} placeholder="e.g. 500+" />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Label *</label>
            <input className="form-input" value={form.label} onChange={e => setForm(f => ({ ...f, label: e.target.value }))} placeholder="e.g. Students Selected" />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Description</label>
            <input className="form-input" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="Optional" />
          </div>
          <div>
            <label style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', display: 'block', marginBottom: 4 }}>Display Order</label>
            <input type="number" className="form-input" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={handleSave} disabled={isPending} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: 'var(--navy)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600, opacity: isPending ? 0.6 : 1 }}>
            <Check size={14} /> {isPending ? 'Saving…' : 'Save'}
          </button>
          <button onClick={() => setEditing(false)} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: '#f3f4f6', color: 'var(--gray-700)', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 600 }}>
            <X size={14} /> Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 1.25rem', borderTop: index > 0 ? '1px solid var(--border)' : 'none' }}>
      <GripVertical size={16} style={{ color: 'var(--gray-300)', flexShrink: 0 }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--orange)', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>{stat.value}</div>
        <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.9375rem', marginTop: 2 }}>{stat.label}</div>
        {stat.description && <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stat.description}</div>}
      </div>
      <span style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--gray-500)', background: 'var(--light-bg)', borderRadius: 4, padding: '2px 6px', flexShrink: 0 }}>
        #{stat.display_order ?? index + 1}
      </span>
      <div style={{ display: 'flex', gap: '0.375rem', flexShrink: 0 }}>
        <button onClick={() => setEditing(true)} title="Edit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: '#eff6ff', color: '#1d4ed8', border: '1px solid #bfdbfe', borderRadius: 6, cursor: 'pointer' }}>
          <Pencil size={14} />
        </button>
        <button onClick={handleDelete} disabled={isPending} title="Delete" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: '#fee2e2', color: '#991b1b', border: '1px solid #fecaca', borderRadius: 6, cursor: 'pointer', opacity: isPending ? 0.5 : 1 }}>
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
}

// ── Add New Form ─────────────────────────────────────────────────────────────
function AddStatForm({ nextOrder }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    startTransition(async () => {
      const result = await upsertResultStat(null, fd);
      if (result?.success) {
        toast.success('Statistic added!');
        e.target.reset();
        setOpen(false);
        router.refresh();
      } else {
        toast.error(result?.message || 'Error');
      }
    });
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', padding: '0.875rem', marginTop: '0.75rem', background: 'var(--orange)', color: 'white', border: 'none', borderRadius: 8, cursor: 'pointer', fontWeight: 600, fontSize: '0.9375rem' }}>
        <Plus size={18} /> Add New Statistic
      </button>
    );
  }

  return (
    <div style={{ background: 'white', borderRadius: 12, border: '2px solid var(--orange)', padding: '1.25rem', marginTop: '0.75rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Add New Statistic</h3>
        <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--gray-500)' }}><X size={18} /></button>
      </div>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <div>
            <label className="form-label">Value *</label>
            <input className="form-input" name="value" required placeholder="e.g. 500+" />
          </div>
          <div>
            <label className="form-label">Label *</label>
            <input className="form-input" name="label" required placeholder="e.g. Students Selected" />
          </div>
        </div>
        <div>
          <label className="form-label">Description (optional)</label>
          <input className="form-input" name="description" placeholder="e.g. Across all exams since 2021" />
        </div>
        <div>
          <label className="form-label">Display Order</label>
          <input type="number" className="form-input" name="display_order" defaultValue={nextOrder} />
        </div>
        <button type="submit" disabled={isPending} style={{ padding: '0.75rem', background: 'var(--orange)', border: 'none', borderRadius: 8, color: 'white', fontWeight: 600, cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1 }}>
          {isPending ? 'Saving…' : 'Add Statistic'}
        </button>
      </form>
    </div>
  );
}

// ── Main Export ──────────────────────────────────────────────────────────────
export default function StatsClient({ initialStats = [] }) {
  return (
    <div>
      <div style={{ background: 'white', borderRadius: 12, border: '1px solid var(--border)', overflow: 'hidden' }}>
        {initialStats.length === 0 && (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.9375rem' }}>
            No statistics yet. Add your first one below.
          </div>
        )}
        {initialStats.map((stat, i) => (
          <StatRow key={stat.id} stat={stat} index={i} />
        ))}
      </div>
      <AddStatForm nextOrder={initialStats.length} />
    </div>
  );
}
