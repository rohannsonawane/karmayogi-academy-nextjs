'use client';

import { useState } from 'react';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { verifyRecaptcha } from '@/lib/actions/verify-recaptcha';

export default function ContactForm({ courses = [] }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    course: courses[0]?.title || 'MPSC Foundation Batch',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.mobile) return;

    setSubmitting(true);

    if (!executeRecaptcha) {
      console.warn('Execute recaptcha not yet available');
      setSubmitting(false);
      return;
    }

    try {
      const token = await executeRecaptcha('contact_form');
      const verifyResult = await verifyRecaptcha(token);

      if (!verifyResult.success) {
        setSubmitting(false);
        alert(verifyResult.message || 'Bot activity detected.');
        return;
      }

      // Simulate API call / save to Supabase
      await new Promise((resolve) => setTimeout(resolve, 800));
      setSubmitting(false);
      setSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitting(false);
      alert('An error occurred during submission. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          background: 'white',
          borderRadius: '1.25rem',
          padding: '3rem 2rem',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
          textAlign: 'center'
        }}
      >
        <CheckCircle size={52} style={{ color: '#10B981', margin: '0 auto 1rem' }} />
        <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.5rem' }}>
          Enquiry Received!
        </h3>
        <p style={{ fontSize: '0.875rem', color: '#6B7280', maxWidth: '420px', margin: '0 auto 1.5rem', lineHeight: 1.6 }}>
          Thank you, <strong>{formData.name}</strong>. Our Nashik academic counselor will get in touch with you shortly at <strong>{formData.mobile}</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({
              name: '',
              mobile: '',
              email: '',
              course: courses[0]?.title || 'MPSC Foundation Batch',
              message: '',
            });
          }}
          style={{
            background: 'var(--orange)',
            color: 'white',
            fontWeight: 600,
            fontSize: '0.875rem',
            padding: '0.625rem 1.5rem',
            borderRadius: '0.5rem',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Send Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        background: 'white',
        borderRadius: '1.25rem',
        padding: '2.5rem',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 14px rgba(0,0,0,0.02)'
      }}
    >
      <span
        style={{
          display: 'inline-block',
          background: '#FEF3C7',
          color: '#92400E',
          fontSize: '0.6875rem',
          fontWeight: 700,
          padding: '0.2rem 0.6rem',
          borderRadius: '0.25rem',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '0.75rem'
        }}
      >
        GET IN TOUCH
      </span>

      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.625rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.35rem' }}>
        Enquire for Admissions
      </h2>
      <p style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '2rem' }}>
        Fill out the form below and our Nashik counseling team will call you back.
      </p>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
            Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Anand Patil"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid #D1D5DB',
              fontSize: '0.875rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Mobile Number *
            </label>
            <input
              type="tel"
              required
              placeholder="98765 43210"
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                border: '1px solid #D1D5DB',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
              Email Address (Optional)
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.625rem 0.875rem',
                borderRadius: '0.5rem',
                border: '1px solid #D1D5DB',
                fontSize: '0.875rem',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
            Interested Course *
          </label>
          <select
            value={formData.course}
            onChange={(e) => setFormData({ ...formData, course: e.target.value })}
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid #D1D5DB',
              fontSize: '0.875rem',
              background: 'white',
              outline: 'none'
            }}
          >
            {courses.length > 0 ? (
              courses.map((c) => (
                <option key={c.id || c.slug} value={c.title}>
                  {c.title}
                </option>
              ))
            ) : (
              <>
                <option value="MPSC Foundation Batch">MPSC Foundation Batch</option>
                <option value="ASO Exam Coaching">ASO Exam Coaching</option>
                <option value="Rajyaseva Classes in Nashik">Rajyaseva Classes in Nashik</option>
                <option value="PSI Classes in Nashik">PSI Classes in Nashik</option>
                <option value="MPSC Combine Group B & C">MPSC Combine Group B & C</option>
                <option value="Talathi Bharti Coaching">Talathi Bharti Coaching</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, color: '#374151', marginBottom: '0.35rem' }}>
            Message (Optional)
          </label>
          <textarea
            rows={4}
            placeholder="Ask about batch timings, fee structure, or demo classes..."
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              width: '100%',
              padding: '0.625rem 0.875rem',
              borderRadius: '0.5rem',
              border: '1px solid #D1D5DB',
              fontSize: '0.875rem',
              outline: 'none',
              resize: 'vertical'
            }}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
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
            gap: '0.5rem',
            boxShadow: '0 4px 10px rgba(244,90,10,0.25)',
            transition: 'background 0.15s'
          }}
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send size={15} />
              Send Inquiry
            </>
          )}
        </button>
      </form>
    </div>
  );
}
