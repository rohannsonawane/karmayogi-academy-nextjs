import Link from 'next/link'
import Image from 'next/image'
import { Play, ArrowRight, Youtube } from 'lucide-react'
import { getLatestYouTubeVideos } from '@/lib/queries/youtube'
import { getSiteSettings } from '@/lib/queries/settings'

const defaultVideos = [
  {
    id: '1',
    title: 'MPSC Rajyaseva Strategy Session — Karmayogi Academy Nashik',
    category: 'RAJYASEVA STRATEGY',
    thumbnail: 'https://img.youtube.com/vi/YOUR_VIDEO_ID_1/maxresdefault.jpg', // Placeholder, we'll use a generic thumbnail or specific ones if available
    url: 'https://www.youtube.com/@KarmayogiMpsc'
  },
  {
    id: '2',
    title: 'Talathi Bharti Exam Preparation & TCS Pattern Breakdown',
    category: 'TALATHI PREP',
    thumbnail: 'https://img.youtube.com/vi/YOUR_VIDEO_ID_2/maxresdefault.jpg',
    url: 'https://www.youtube.com/@KarmayogiMpsc'
  },
  {
    id: '3',
    title: 'PSI Exam Complete Roadmap: Prelims, Mains Law & Physical Test',
    category: 'PSI STRATEGY',
    thumbnail: 'https://img.youtube.com/vi/YOUR_VIDEO_ID_3/maxresdefault.jpg',
    url: 'https://www.youtube.com/@KarmayogiMpsc'
  },
  {
    id: '4',
    title: 'MPSC & Combined Group B C Officers Guidance Workshop',
    category: 'OFFICER MENTORSHIP',
    thumbnail: 'https://img.youtube.com/vi/YOUR_VIDEO_ID_4/maxresdefault.jpg',
    url: 'https://www.youtube.com/@KarmayogiMpsc'
  }
]

export default async function YouTubeSection() {
  const dynamicVideos = await getLatestYouTubeVideos()
  const settings = await getSiteSettings()
  
  const displayVideos = dynamicVideos && dynamicVideos.length > 0 ? dynamicVideos : defaultVideos
  const youtubeUrl = settings?.youtube_url || 'https://www.youtube.com/@KarmayogiMpsc'

  return (
    <section className="section-py bg-white">
      <div className="container-ka">
        <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 3rem' }}>
          <span className="section-label" style={{ color: 'var(--orange)' }}>FREE GUIDANCE & LECTURES</span>
          <h2 className="section-heading" style={{ color: 'var(--navy)' }}>Learn from Our YouTube Channel</h2>
          <p style={{ color: 'var(--gray-600)', fontSize: '0.875rem' }}>
            Free lectures, strategy sessions, and exam updates — subscribe now.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
          {displayVideos.map((video) => (
            <Link key={video.id} href={video.url} target="_blank" rel="noopener noreferrer" className="card" style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', textDecoration: 'none' }}>
              <div style={{ height: 200, position: 'relative', background: 'var(--light-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'rgba(0,0,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, background: 'rgba(0,0,0,0.7)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                        <Play size={24} fill="currentColor" />
                    </div>
                </div>
                {video.thumbnail ? (
                   <Image src={video.thumbnail} alt={video.title} fill style={{ objectFit: 'cover' }} unoptimized={true} />
                ) : (
                   <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--navy) 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                )}
              </div>
              
              <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.65rem', color: 'var(--orange)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
                  {video.category || 'LATEST VIDEO'}
                </div>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4, margin: 0 }}>
                  {video.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ background: 'var(--orange)', border: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', borderRadius: 'var(--radius-md)' }}>
            Visit Our YouTube Channel <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
