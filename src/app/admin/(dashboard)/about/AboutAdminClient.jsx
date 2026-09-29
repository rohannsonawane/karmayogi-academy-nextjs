'use client';

import { useState, useTransition } from 'react';
import toast from 'react-hot-toast';

const DEFAULT_ABOUT = {
  hero_breadcrumb: 'ABOUT US',
  hero_title: 'About Karmayogi Academy',
  hero_subtitle: "Maharashtra's Premier MPSC Coaching Institute in Nashik",
  movement_badge: 'THE MOVEMENT',
  movement_heading: 'Founded by Officers, Built for Qualifiers',
  movement_p1: 'In an era where coaching institutes have multiplied — focused not on student growth but on market capture — Karmayogi Academy was built differently.',
  movement_p2: 'Founded on three pillars: experienced mentors who have themselves cleared these exams and serve as officers today, high-quality study material updated to current formats, and a structured bank of previous year exam papers.',
  movement_p3: 'We are not just a coaching class. We are the officer-making movement of Nashik. We understand the mental grit, syllabus strategy, and answer writing finesse required to crack MPSC Rajyaseva, PSI, STI, ASO, and Talathi recruitment.',
  mission_statement: "To build the next generation of Maharashtra's civil service officers through honest, structured, and expert-led preparation.",
  pillar1_title: 'Pillar 1: Post-Holder Mentors',
  pillar1_desc: 'Mentors who cleared the exam (serving & selected officers).',
  pillar2_title: 'Pillar 2: Quality Study Material',
  pillar2_desc: 'Updated yearly to match latest descriptive & prelims formats.',
  pillar3_title: 'Pillar 3: PYQ Bank & Mock System',
  pillar3_desc: 'Comprehensive previous year question paper dissection & daily tests.',
  founders_heading: 'Meet Our Founders',
  founders_subheading: 'Built by officers who cleared the exam themselves.',
  founder1_image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5_LxrDCzDw7f35uvFP9asozzVO7FhxpFWZzam0GQ7WYgdEaJJElPvE80&s=10',
  founder1_initials: 'AK',
  founder1_name: 'Aadesh Karpe',
  founder1_role: 'Co-Founder & Head Mentor',
  founder1_designation: 'Gram Mahasul Adhikari (Talathi) — Serving Officer',
  founder1_color: '#EA580C',
  founder1_bio1: 'Aadesh Karpe Sir cleared the Talathi exam and currently serves as Gram Mahasul Adhikari. He founded Karmayogi Academy with a single belief — that students deserve to learn from someone who has actually sat in the same exam hall, faced the same pressure, and come out the other side as an officer.',
  founder1_bio2: 'At Karmayogi, he leads the exam strategy sessions, answer writing workshops, and the PYQ dissection classes that students consistently rate as the turning point in their preparation.',
  founder1_badge: 'Cleared Talathi Exam · Serving as Gram Mahasul Adhikari',
  founder2_image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN5_LxrDCzDw7f35uvFP9asozzVO7FhxpFWZzam0GQ7WYgdEaJJElPvE80&s=10",
  founder2_initials: 'AR',
  founder2_name: 'Amol Rajole',
  founder2_role: 'Co-Founder & Academic Director',
  founder2_designation: 'Co-Founder — Karmayogi Academy',
  founder2_color: '#1E3A8A',
  founder2_bio1: 'Amol Rajole Sir brings the academic and operational backbone to Karmayogi Academy. With a deep understanding of the MPSC examination ecosystem — from preliminary strategy to mains answer structuring — he designed the 52-week preparation framework that has now guided over 1,300 students.',
  founder2_bio2: 'He oversees curriculum planning, study material development, and ensures that every batch at Karmayogi runs with the discipline and structure that competitive exam preparation demands.',
  founder2_badge: 'Architect of the 52-Week Karmayogi Preparation System',
  cta_heading: 'Start Your Officer Journey Today',
  cta_subtext: 'Visit our Ashok Stambh, Nashik campus for 1-on-1 counseling with post-holder mentors.',
  cta_button_text: 'Enquire for Batch Timings',
  cta_button_href: '/contact',
};

const TABS = [
  { id: 'hero', label: '🏷️ Hero' },
  { id: 'movement', label: '✊ Movement' },
  { id: 'pillars', label: '🏛️ Pillars' },
  { id: 'founders', label: '👤 Founders' },
  { id: 'cta', label: '📢 CTA Banner' },
];

export default function AboutAdminClient({ initialAbout, onSubmit }) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('hero');
  const [form, setForm] = useState(() => ({ ...DEFAULT_ABOUT, ...initialAbout }));

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set('about_page', JSON.stringify(form));
    startTransition(async () => {
      const result = await onSubmit(null, formData);
      if (result?.success) toast.success(result.message);
      else toast.error(result?.message || 'Error saving About page');
    });
  };

  const inputStyle = {
    width: '100%', padding: '0.625rem 0.875rem',
    border: '1.5px solid var(--gray-200)', borderRadius: '0.375rem',
    fontSize: '0.9375rem', color: 'var(--gray-800)', outline: 'none',
    background: 'white', boxSizing: 'border-box',
  };
  const textareaStyle = { ...inputStyle, resize: 'vertical' };
  const labelStyle = {
    display: 'block', fontSize: '0.8125rem', fontWeight: 600,
    color: 'var(--gray-700)', marginBottom: '0.375rem',
  };
  const fieldStyle = { marginBottom: '1.25rem' };
  const sectionStyle = {
    background: 'white', borderRadius: '12px', border: '1px solid var(--border)',
    boxShadow: 'var(--shadow)', padding: '1.75rem', marginBottom: '1.5rem',
  };
  const sectionTitleStyle = {
    fontSize: '1.0625rem', fontWeight: 700, color: 'var(--navy)',
    marginBottom: '1.5rem', paddingBottom: '0.75rem',
    borderBottom: '2px solid var(--border)',
  };

  const Field = ({ label, name, rows }) => (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {rows ? (
        <textarea
          style={textareaStyle}
          rows={rows}
          value={form[name] ?? ''}
          onChange={set(name)}
        />
      ) : (
        <input
          style={inputStyle}
          value={form[name] ?? ''}
          onChange={set(name)}
        />
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Main Panel */}
        <div>
          {/* Tabs */}
          <div style={{
            display: 'flex', gap: '4px', background: '#F3F4F6',
            borderRadius: '10px', padding: '4px', marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: '1 1 auto',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '7px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '0.8125rem',
                  fontWeight: activeTab === tab.id ? 700 : 500,
                  background: activeTab === tab.id ? 'white' : 'transparent',
                  color: activeTab === tab.id ? 'var(--navy)' : 'var(--gray-500)',
                  boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all 0.15s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Hero Tab */}
          {activeTab === 'hero' && (
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>Hero Section</h2>
              <Field label="Breadcrumb Label" name="hero_breadcrumb" />
              <Field label="Page Title" name="hero_title" />
              <Field label="Subtitle" name="hero_subtitle" rows={2} />
            </div>
          )}

          {/* Movement Tab */}
          {activeTab === 'movement' && (
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>The Movement Section</h2>
              <Field label="Section Badge Text" name="movement_badge" />
              <Field label="Main Heading" name="movement_heading" />
              <Field label="Paragraph 1" name="movement_p1" rows={3} />
              <Field label="Paragraph 2" name="movement_p2" rows={3} />
              <Field label="Paragraph 3" name="movement_p3" rows={3} />
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', marginTop: '0.5rem' }}>
                <Field label="Mission Statement (shown in quote box)" name="mission_statement" rows={3} />
              </div>
            </div>
          )}

          {/* Pillars Tab */}
          {activeTab === 'pillars' && (
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>The 3 Pillars</h2>
              {[1, 2, 3].map((n) => (
                <div key={n} style={{ marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: n < 3 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--orange)', marginBottom: '0.875rem' }}>
                    Pillar {n}
                  </div>
                  <Field label="Title" name={`pillar${n}_title`} />
                  <Field label="Description" name={`pillar${n}_desc`} rows={2} />
                </div>
              ))}
            </div>
          )}

          {/* Founders Tab */}
          {activeTab === 'founders' && (
            <>
              <div style={{ ...sectionStyle }}>
                <h2 style={sectionTitleStyle}>Section Header</h2>
                <Field label="Section Heading" name="founders_heading" />
                <Field label="Section Subheading" name="founders_subheading" />
              </div>

              {[1, 2].map((n) => (
                <div key={n} style={sectionStyle}>
                  <h2 style={sectionTitleStyle}>Founder {n}</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1.25rem' }}>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Image URL</label>
                      <input style={inputStyle} value={form[`founder${n}_image`] ?? ''} onChange={set(`founder${n}_image`)} />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Initials (Avatar)</label>
                      <input style={inputStyle} value={form[`founder${n}_initials`] ?? ''} onChange={set(`founder${n}_initials`)} maxLength={3} />
                    </div>
                    <div style={fieldStyle}>
                      <label style={labelStyle}>Avatar Background Color</label>
                      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                        <input
                          type="color"
                          value={form[`founder${n}_color`] ?? '#EA580C'}
                          onChange={set(`founder${n}_color`)}
                          style={{ width: 40, height: 36, border: 'none', padding: 0, cursor: 'pointer', borderRadius: 6 }}
                        />
                        <input
                          style={{ ...inputStyle, flex: 1 }}
                          value={form[`founder${n}_color`] ?? ''}
                          onChange={set(`founder${n}_color`)}
                          placeholder="#EA580C"
                        />
                      </div>
                    </div>
                  </div>
                  <Field label="Full Name" name={`founder${n}_name`} />
                  <Field label="Role / Title" name={`founder${n}_role`} />
                  <Field label="Designation / Position" name={`founder${n}_designation`} />
                  <Field label="Bio Paragraph 1" name={`founder${n}_bio1`} rows={4} />
                  <Field label="Bio Paragraph 2" name={`founder${n}_bio2`} rows={4} />
                  <Field label="Achievement Badge Text" name={`founder${n}_badge`} rows={2} />
                </div>
              ))}
            </>
          )}

          {/* CTA Tab */}
          {activeTab === 'cta' && (
            <div style={sectionStyle}>
              <h2 style={sectionTitleStyle}>CTA Banner (Bottom)</h2>
              <Field label="Heading" name="cta_heading" />
              <Field label="Subtext" name="cta_subtext" rows={2} />
              <Field label="Button Text" name="cta_button_text" />
              <Field label="Button Link (href)" name="cta_button_href" />
            </div>
          )}
        </div>

        {/* Sticky Save Sidebar */}
        <div style={{ position: 'sticky', top: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem', boxShadow: 'var(--shadow)' }}>
            <button
              type="submit"
              disabled={isPending}
              style={{
                width: '100%', padding: '0.75rem',
                background: isPending ? 'rgba(244,90,10,0.5)' : 'var(--orange)',
                border: 'none', borderRadius: '8px', color: 'white',
                fontWeight: 600, fontSize: '0.9375rem',
                cursor: isPending ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 12px rgba(244,90,10,0.2)',
              }}
            >
              {isPending ? 'Saving…' : '💾 Save About Page'}
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)', textAlign: 'center', marginTop: '0.75rem', lineHeight: 1.4 }}>
              Changes are published immediately to the public About page.
            </div>
          </div>

          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', padding: '1.25rem', boxShadow: 'var(--shadow)' }}>
            <div style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem' }}>Preview</div>
            <a
              href="/about"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', textAlign: 'center', padding: '0.625rem',
                background: '#F3F4F6', borderRadius: '7px',
                color: 'var(--navy)', fontWeight: 600, fontSize: '0.8125rem',
                textDecoration: 'none',
              }}
            >
              🔗 View Public About Page ↗
            </a>
          </div>

          <div style={{ background: '#FFFBEB', borderRadius: '12px', border: '1px solid #FDE68A', padding: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#78350F', lineHeight: 1.5 }}>
              <strong>Tip:</strong> Use the tabs above to navigate between sections. All unsaved changes across tabs are preserved until you hit Save.
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
