'use client';

import { useState } from 'react';
import { updateEnquiryStatus, updateEnquiryNotes, deleteEnquiry } from '@/lib/actions/admin-enquiries';
import toast from 'react-hot-toast';
import { Trash2, MessageSquare } from 'lucide-react';

const STATUS_OPTIONS = [
  { value: 'new', label: 'New', color: '#1e40af', bg: '#dbeafe' },
  { value: 'contacted', label: 'Contacted', color: '#166534', bg: '#dcfce7' },
  { value: 'follow_up', label: 'Follow Up', color: '#854d0e', bg: '#fef9c3' },
  { value: 'converted', label: 'Converted', color: '#065f46', bg: '#d1fae5' },
  { value: 'closed', label: 'Closed', color: '#374151', bg: '#f3f4f6' },
];

export default function EnquiriesClient({ initialEnquiries }) {
  const [filter, setFilter] = useState('all');

  const filteredEnquiries = filter === 'all'
    ? initialEnquiries
    : initialEnquiries.filter(e => e.status === filter);

  return (
    <div>
      {/* Filters */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '4px' }}>
        <button onClick={() => setFilter('all')} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: filter === 'all' ? 'var(--navy)' : 'white', color: filter === 'all' ? 'white' : 'var(--gray-600)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: filter === 'all' ? 'var(--shadow)' : 'none' }}>
          All
        </button>
        {STATUS_OPTIONS.map(opt => (
          <button key={opt.value} onClick={() => setFilter(opt.value)} style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: filter === opt.value ? opt.bg : 'white', color: filter === opt.value ? opt.color : 'var(--gray-600)', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: filter === opt.value ? 'var(--shadow)' : 'none' }}>
            {opt.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {filteredEnquiries.map(enq => (
          <EnquiryCard key={enq.id} enquiry={enq} />
        ))}
        {filteredEnquiries.length === 0 && (
          <div style={{ background: 'white', borderRadius: '12px', padding: '3rem', textAlign: 'center', color: 'var(--gray-400)', border: '1px solid var(--border)' }}>
            No enquiries found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}

function EnquiryCard({ enquiry }) {
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [notes, setNotes] = useState(enquiry.notes || '');

  const handleStatusChange = async (e) => {
    setIsUpdatingStatus(true);
    const result = await updateEnquiryStatus(enquiry.id, e.target.value);
    if (result.success) toast.success('Status updated');
    else toast.error(result.message);
    setIsUpdatingStatus(false);
  };

  const handleNotesSave = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append('id', enquiry.id);
    const result = await updateEnquiryNotes(null, formData);
    if (result.success) toast.success('Notes saved');
    else toast.error(result.message);
  };

  const statusStyle = STATUS_OPTIONS.find(o => o.value === enquiry.status) || STATUS_OPTIONS[0];

  return (
    <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', padding: '1.25rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '2rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <div style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)' }}>{enquiry.full_name}</div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', marginTop: '2px' }}>
                Submitted: {new Date(enquiry.created_at).toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            <div style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', background: statusStyle.bg, color: statusStyle.color, fontSize: '0.75rem', fontWeight: 600 }}>
              {statusStyle.label}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', background: 'var(--light-bg)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Contact</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 500, marginTop: '2px' }}>{enquiry.mobile}</div>
              {enquiry.email && <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', marginTop: '2px' }}>{enquiry.email}</div>}
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', fontWeight: 600, textTransform: 'uppercase' }}>Interested In</div>
              <div style={{ fontSize: '0.875rem', color: 'var(--navy)', fontWeight: 500, marginTop: '2px' }}>
                {enquiry.course_name || (enquiry.courses ? enquiry.courses.title : 'General Enquiry')}
              </div>
              {enquiry.preferred_batch && <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', marginTop: '2px' }}>Batch: {enquiry.preferred_batch}</div>}
            </div>
          </div>

          {enquiry.message && (
            <div style={{ marginBottom: '1rem' }}>
              <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)', marginBottom: '0.25rem' }}>Message:</div>
              <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6, padding: '0.75rem', background: '#f9fafb', borderLeft: '3px solid var(--orange)', borderRadius: '0 6px 6px 0' }}>
                {enquiry.message}
              </p>
            </div>
          )}
        </div>

        <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Update Status</label>
            <select
              defaultValue={enquiry.status}
              onChange={handleStatusChange}
              disabled={isUpdatingStatus}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1.5px solid var(--gray-200)', fontSize: '0.875rem', outline: 'none' }}
            >
              {STATUS_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <form onSubmit={handleNotesSave}>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--gray-600)', marginBottom: '0.5rem' }}>Internal Notes</label>
            <textarea
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add follow-up notes..."
              rows={3}
              style={{ width: '100%', padding: '0.5rem', borderRadius: '6px', border: '1.5px solid var(--gray-200)', fontSize: '0.875rem', outline: 'none', resize: 'vertical', marginBottom: '0.5rem' }}
            />
            <button type="submit" style={{ width: '100%', padding: '0.5rem', background: 'var(--light-bg)', border: '1px solid var(--gray-200)', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600, color: 'var(--navy)', cursor: 'pointer' }}>
              Save Notes
            </button>
          </form>

          <form action={async () => { await deleteEnquiry(enquiry.id); }} style={{ marginTop: 'auto' }}>
            <button type="submit" onClick={(e) => { if (!confirm('Delete this enquiry?')) e.preventDefault(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.375rem', width: '100%', padding: '0.5rem', background: '#fee2e2', border: 'none', borderRadius: '6px', fontSize: '0.8125rem', fontWeight: 600, color: '#991b1b', cursor: 'pointer' }}>
              <Trash2 size={14} /> Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
