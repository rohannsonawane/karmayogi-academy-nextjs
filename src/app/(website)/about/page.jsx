import Link from 'next/link';
import Image from 'next/image';
import PageHero from '@/components/website/PageHero';
import { getSiteSettings } from '@/lib/queries/settings';
import { Award, BookOpen, CheckCircle, FileCheck, Users } from 'lucide-react';

export const metadata = {
  title: `About Karmayogi Academy | Maharashtra's Premier MPSC Institute`,
  description: 'Founded by officers, built for qualifiers. Learn about our mission, 3 pillars of coaching, and leadership team.',
};

// Hard-coded defaults — used when about_page column is null / field is missing
const D = {
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
  founder2_image: '',
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

function v(db, key) {
  return (db && db[key] != null && db[key] !== '') ? db[key] : D[key];
}

const PILLAR_ICONS = [Users, BookOpen, FileCheck];
const PILLAR_COLORS = [
  { bg: '#FEF3C7', color: '#D97706' },
  { bg: '#EFF6FF', color: '#2563EB' },
  { bg: '#FEF3C7', color: 'var(--orange)' },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const db = settings?.about_page ?? {};

  const pillars = [
    { title: v(db, 'pillar1_title'), desc: v(db, 'pillar1_desc') },
    { title: v(db, 'pillar2_title'), desc: v(db, 'pillar2_desc') },
    { title: v(db, 'pillar3_title'), desc: v(db, 'pillar3_desc') },
  ];

  const founders = [
    {
      img: v(db, 'founder1_image'),
      initials: v(db, 'founder1_initials'),
      name: v(db, 'founder1_name'),
      role: v(db, 'founder1_role'),
      designation: v(db, 'founder1_designation'),
      color: v(db, 'founder1_color'),
      bio1: v(db, 'founder1_bio1'),
      bio2: v(db, 'founder1_bio2'),
      badge: v(db, 'founder1_badge'),
    },
    {
      img: v(db, 'founder2_image'),
      initials: v(db, 'founder2_initials'),
      name: v(db, 'founder2_name'),
      role: v(db, 'founder2_role'),
      designation: v(db, 'founder2_designation'),
      color: v(db, 'founder2_color'),
      bio1: v(db, 'founder2_bio1'),
      bio2: v(db, 'founder2_bio2'),
      badge: v(db, 'founder2_badge'),
    },
  ];

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
      {/* 1. HERO SECTION */}
      <PageHero
        breadcrumb={v(db, 'hero_breadcrumb')}
        title={v(db, 'hero_title')}
        subtitle={v(db, 'hero_subtitle')}
      />

      <div className="container-ka" style={{ padding: '4rem 1rem' }}>
        {/* 2. THE MOVEMENT & 3 PILLARS SECTION */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            marginBottom: '5rem'
          }}
        >
          {/* Left: Narrative */}
          <div>
            <span
              style={{
                display: 'inline-block',
                background: '#FEF3C7',
                color: '#92400E',
                fontSize: '0.6875rem',
                fontWeight: 700,
                padding: '0.2rem 0.625rem',
                borderRadius: '0.25rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              {v(db, 'movement_badge')}
            </span>

            <h2
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(1.75rem, 4vw, 2.35rem)',
                fontWeight: 800,
                color: 'var(--navy)',
                lineHeight: 1.25,
                marginBottom: '1.25rem'
              }}
            >
              {v(db, 'movement_heading')}
            </h2>

            <div style={{ fontSize: '0.9375rem', color: '#4B5563', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <p>{v(db, 'movement_p1')}</p>
              <p>{v(db, 'movement_p2')}</p>
              <p>{v(db, 'movement_p3')}</p>
            </div>

            {/* Mission Box */}
            <div
              style={{
                background: '#FFFBEB',
                borderLeft: '4px solid var(--gold)',
                borderRadius: '0 0.5rem 0.5rem 0',
                padding: '1.25rem 1.5rem'
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--orange)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.35rem' }}>
                Our Mission Statement
              </div>
              <p style={{ fontStyle: 'italic', color: '#78350F', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                &ldquo;{v(db, 'mission_statement')}&rdquo;
              </p>
            </div>
          </div>

          {/* Right: The 3 Pillars Card */}
          <div>
            <div
              style={{
                background: 'white',
                borderRadius: '1.25rem',
                padding: '2.5rem',
                border: '1px solid #E5E7EB',
                boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                gap: '2rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: 'var(--orange)', fontSize: '1.25rem' }}>•</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>
                  The 3 Pillars of Karmayogi
                </h3>
              </div>

              {pillars.map((pillar, i) => {
                const Icon = PILLAR_ICONS[i];
                const { bg, color } = PILLAR_COLORS[i];
                return (
                  <div key={i} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 44, height: 44, borderRadius: '0.5rem',
                        background: bg, color,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.2rem' }}>
                        {pillar.title}
                      </h4>
                      <p style={{ fontSize: '0.8125rem', color: '#6B7280', lineHeight: 1.55 }}>
                        {pillar.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3. MEET OUR FOUNDERS SECTION */}
        <div style={{ marginBottom: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.25rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '0.35rem' }}>
              {v(db, 'founders_heading')}
            </h2>
            <p style={{ color: '#6B7280', fontSize: '0.9375rem' }}>
              {v(db, 'founders_subheading')}
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2.5rem' }}>
            {founders.map((founder, i) => (
              <div
                key={i}
                style={{
                  background: 'white',
                  borderRadius: '1.25rem',
                  padding: '2.5rem',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.02)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  {founder.img ? (
                    <Image
                      src={founder.img}
                      alt={founder.name}
                      width={64}
                      height={64}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover', flexShrink: 0,
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: founder.color,
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.35rem', fontWeight: 800, flexShrink: 0,
                      }}
                    >
                      {founder.initials}
                    </div>
                  )}
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.2rem' }}>
                      {founder.name}
                    </h3>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--orange)' }}>
                      {founder.role}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                      {founder.designation}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.7 }}>{founder.bio1}</p>
                <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.7 }}>{founder.bio2}</p>

                <div
                  style={{
                    marginTop: 'auto',
                    padding: '0.625rem 0.875rem',
                    background: '#FEF3C7',
                    borderRadius: '0.5rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: '#92400E'
                  }}
                >
                  <CheckCircle size={14} style={{ color: 'var(--orange)', flexShrink: 0 }} />
                  <span>{founder.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. BOTTOM CALLOUT BANNER */}
        <div
          style={{
            background: '#1F4295',
            borderRadius: '1.25rem',
            padding: '3.5rem 1.5rem',
            textAlign: 'center',
            color: 'white',
            boxShadow: '0 10px 25px -5px rgba(31, 66, 149, 0.4)'
          }}
        >
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              fontWeight: 800,
              marginBottom: '0.75rem',
              color: 'white'
            }}
          >
            {v(db, 'cta_heading')}
          </h2>
          <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            {v(db, 'cta_subtext')}
          </p>
          <Link
            href={v(db, 'cta_button_href')}
            style={{
              display: 'inline-block',
              background: 'var(--orange)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.9375rem',
              padding: '0.875rem 2.25rem',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              boxShadow: '0 4px 12px rgba(244,90,10,0.3)',
              transition: 'background 0.15s'
            }}
          >
            {v(db, 'cta_button_text')}
          </Link>
        </div>
      </div>
    </div>
  );
}
