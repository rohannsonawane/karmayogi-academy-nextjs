import Image from 'next/image';
import { Quote, Star } from 'lucide-react';


export default function TestimonialCard({ testimonial }) {
  return (
    <div
      className="card"
      style={{ padding: '1.5rem', height: '100%', display: 'flex', flexDirection: 'column', gap: '1rem', position: 'relative' }}>
      
      <Quote size={24} style={{ color: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />

      {/* Stars */}
      <div style={{ display: 'flex', gap: '0.25rem' }}>
        {Array.from({ length: testimonial.rating }).map((_, i) =>
        <Star key={i} size={14} style={{ color: 'var(--gold)', fill: 'var(--gold)' }} />
        )}
      </div>

      <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.75, flex: 1 }}>
        &ldquo;{testimonial.review}&rdquo;
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingTop: '0.5rem', borderTop: '1px solid var(--border)' }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            overflow: 'hidden',
            background: 'var(--navy)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold)',
            fontWeight: 700,
            fontSize: '1rem',
            flexShrink: 0
          }}>
          
          {testimonial.photo_url ?
          <Image src={testimonial.photo_url} alt={testimonial.student_name} width={40} height={40} style={{ objectFit: 'cover' }} /> :

          testimonial.student_name.charAt(0)
          }
        </div>
        <div>
          <p style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--navy)' }}>{testimonial.student_name}</p>
          {testimonial.course &&
          <p style={{ fontSize: '0.75rem', color: 'var(--orange)', fontWeight: 500 }}>{testimonial.course}</p>
          }
        </div>
      </div>
    </div>);

}