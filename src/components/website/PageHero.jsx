









export default function PageHero({ breadcrumb, title, subtitle, dark = true }) {
  return (
    <section
      style={{
        background: dark ? 'var(--navy)' : 'var(--light-bg)',
        padding: '3.5rem 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
      
      {/* Subtle pattern overlay */}
      {dark &&
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(31,66,149,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,181,27,0.08) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />

      }
      <div className="container-ka" style={{ position: 'relative', zIndex: 1 }}>
        {breadcrumb &&
        <p style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.75rem' }}>
            Home / {breadcrumb}
          </p>
        }
        <h1
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(1.875rem, 5vw, 2.75rem)',
            fontWeight: 800,
            color: dark ? 'white' : 'var(--navy)',
            marginBottom: subtitle ? '0.75rem' : 0,
            lineHeight: 1.2
          }}>
          
          {title}
        </h1>
        {subtitle &&
        <p style={{ fontSize: '1rem', color: dark ? 'rgba(255,255,255,0.75)' : 'var(--gray-600)', maxWidth: 600, margin: '0 auto', lineHeight: 1.65 }}>
            {subtitle}
          </p>
        }
      </div>
    </section>);

}