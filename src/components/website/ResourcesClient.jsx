'use client';

import { useState } from 'react';
import { FileText, Download, X, CheckCircle, Loader2 } from 'lucide-react';

export default function ResourcesClient({ initialResources = [], categories = [] }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedResource, setSelectedResource] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [submitting, setSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const filteredResources = activeCategory === 'all'
    ? initialResources
    : initialResources.filter((r) => r.category_slug === activeCategory || r.resource_categories?.slug === activeCategory);

  const handleOpenDownload = (resource) => {
    setSelectedResource(resource);
    setDownloadSuccess(false);
    setModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    setSubmitting(true);
    // Simulate brief network submission or lead capture
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitting(false);
    setDownloadSuccess(true);
  };

  return (
    <>
      {/* FILTER PILLS */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '0.625rem', marginBottom: '3rem' }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat.slug;
          return (
            <button
              key={cat.id || cat.slug}
              type="button"
              onClick={() => setActiveCategory(cat.slug)}
              style={{
                padding: '0.5rem 1.25rem',
                borderRadius: '9999px',
                fontSize: '0.875rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
                border: isActive ? 'none' : '1px solid #E5E7EB',
                background: isActive ? 'var(--orange)' : 'white',
                color: isActive ? 'white' : '#4B5563',
                boxShadow: isActive ? '0 2px 8px rgba(244,90,10,0.25)' : 'none'
              }}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* RESOURCE CARDS GRID */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.75rem',
          marginBottom: '3rem'
        }}
      >
        {filteredResources.map((res, idx) => (
          <div
            key={res.id || idx}
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '1.5rem',
              border: '1px solid #E5E7EB',
              boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.25rem'
            }}
          >
            <div>
              {/* Card Header: Icon & PDF Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '0.5rem',
                    background: '#FEF3C7',
                    color: '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <FileText size={22} />
                </div>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    fontWeight: 700,
                    color: '#2563EB',
                    background: '#EFF6FF',
                    border: '1px solid #DBEAFE',
                    padding: '0.15rem 0.5rem',
                    borderRadius: '0.25rem',
                    letterSpacing: '0.04em'
                  }}
                >
                  PDF
                </span>
              </div>

              <h3
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 700,
                  color: 'var(--navy)',
                  lineHeight: 1.35,
                  marginBottom: '0.5rem'
                }}
              >
                {res.title}
              </h3>

              <div style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                Target Exam: <span style={{ color: '#374151', fontWeight: 500 }}>{res.target_exam || 'MPSC Aspirants'}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenDownload(res)}
              style={{
                width: '100%',
                background: 'var(--orange)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.875rem',
                padding: '0.75rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'background 0.15s',
                boxShadow: '0 2px 6px rgba(244,90,10,0.2)'
              }}
            >
              <Download size={16} />
              Download Free
            </button>
          </div>
        ))}
      </div>

      {/* LEAD CAPTURE MODAL */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              maxWidth: '440px',
              width: '100%',
              boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)',
              position: 'relative'
            }}
          >
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                background: 'none',
                border: 'none',
                color: '#9CA3AF',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>

            {!downloadSuccess ? (
              <>
                <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                  <div
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: '50%',
                      background: '#FEF3C7',
                      color: 'var(--orange)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '0.75rem'
                    }}
                  >
                    <Download size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.25rem' }}>
                    Free Instant Download
                  </h3>
                  <p style={{ fontSize: '0.8125rem', color: '#6B7280' }}>
                    {selectedResource?.title}
                  </p>
                </div>

                <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
                      WhatsApp / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.mobile}
                      onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.625rem 0.875rem',
                        borderRadius: '0.5rem',
                        border: '1px solid #D1D5DB',
                        fontSize: '0.875rem'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      marginTop: '0.5rem',
                      background: 'var(--orange)',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9375rem',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: submitting ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Preparing PDF...
                      </>
                    ) : (
                      'Download PDF Now'
                    )}
                  </button>
                </form>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                <CheckCircle size={48} style={{ color: '#10B981', margin: '0 auto 1rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
                  Download Started!
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  Thank you, <strong>{formData.name}</strong>. Your study guide has been queued for download. We have also sent a copy to <strong>{formData.mobile}</strong>.
                </p>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{
                    background: '#1F2937',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.875rem',
                    padding: '0.625rem 1.5rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
