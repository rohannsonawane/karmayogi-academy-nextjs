import Image from 'next/image';
import { BookOpen, CheckCircle } from 'lucide-react';







export default function FacultyCard({ faculty, variant = 'faculty' }) {
  const isFounder = variant === 'founder';

  const avatarColors = [
  { bg: '#F45A0A', text: 'white' },
  { bg: '#0B1B41', text: 'white' },
  { bg: '#F5B51B', text: '#0B1B41' },
  { bg: '#1F4295', text: 'white' }];

  const colorIndex = faculty.name.charCodeAt(0) % avatarColors.length;
  const avatarColor = avatarColors[colorIndex];

  return (
    <div
      className="card"
      style={{
        padding: isFounder ? '1.5rem' : '1.25rem',
        display: 'flex',
        flexDirection: isFounder ? 'row' : 'column',
        gap: '1.25rem',
        alignItems: isFounder ? 'flex-start' : 'center',
        height: '100%'
      }}>
      
      {/* Avatar / Photo */}
      <div
        style={{
          width: isFounder ? 72 : 80,
          height: isFounder ? 72 : 80,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          background: avatarColor.bg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isFounder ? '1.5rem' : '1.75rem',
          fontWeight: 800,
          color: avatarColor.text,
          fontFamily: 'Inter, sans-serif'
        }}>
        
        {faculty.photo_url ?
        <Image
          src={faculty.photo_url}
          alt={faculty.name}
          width={isFounder ? 72 : 80}
          height={isFounder ? 72 : 80}
          style={{ objectFit: 'cover', width: '100%', height: '100%' }} /> :


        faculty.name.charAt(0).toUpperCase()
        }
      </div>

      {/* Info */}
      <div style={{ flex: 1, textAlign: isFounder ? 'left' : 'center' }}>
        <h3
          style={{
            fontSize: isFounder ? '1.0625rem' : '0.9375rem',
            fontWeight: 700,
            color: 'var(--navy)',
            fontFamily: 'Inter, sans-serif',
            marginBottom: '0.25rem'
          }}>
          
          {faculty.name}
        </h3>
        {faculty.designation &&
        <p style={{ fontSize: '0.8125rem', color: 'var(--orange)', fontWeight: 600, marginBottom: '0.5rem' }}>
            {faculty.designation}
          </p>
        }
        {faculty.badge &&
        <span
          style={{
            display: 'inline-block',
            background: isFounder ? 'var(--gold)' : 'var(--light-bg)',
            color: isFounder ? 'var(--navy)' : 'var(--navy)',
            fontSize: '0.6875rem',
            fontWeight: 700,
            padding: '0.2rem 0.625rem',
            borderRadius: '9999px',
            marginBottom: '0.625rem',
            textTransform: 'uppercase',
            letterSpacing: '0.04em'
          }}>
          
            {faculty.badge}
          </span>
        }
        {faculty.subject &&
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem', justifyContent: isFounder ? 'flex-start' : 'center' }}>
            <BookOpen size={13} style={{ color: 'var(--orange)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', fontWeight: 500 }}>
              {faculty.subject}
            </span>
          </div>
        }
        {faculty.description &&
        <p style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.65, textAlign: isFounder ? 'left' : 'center' }}>
            {faculty.description}
          </p>
        }
        {isFounder && faculty.badge &&
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.75rem' }}>
            <CheckCircle size={13} style={{ color: 'var(--orange)' }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--gray-600)', fontStyle: 'italic' }}>{faculty.badge}</span>
          </div>
        }
      </div>
    </div>);

}