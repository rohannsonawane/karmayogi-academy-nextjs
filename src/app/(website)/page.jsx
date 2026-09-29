import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, GraduationCap, Users, Award, BookOpen, Star, Building2 } from 'lucide-react'
import { getSiteSettings } from '@/lib/queries/settings'
import { getCourses } from '@/lib/queries/courses'
import { getTestimonials } from '@/lib/queries/testimonials'
import { getBlogs } from '@/lib/queries/blogs'
import { getResultStatistics } from '@/lib/queries/results'
import { getGoogleReviews } from '@/lib/queries/google-reviews'
import CourseCard from '@/components/website/CourseCard'
import TestimonialCard from '@/components/website/TestimonialCard'
import YouTubeSection from '@/components/website/YouTubeSection'

export default async function HomePage() {
  const settings = await getSiteSettings()
  const featuredCourses = await getCourses({ featured: true, limit: 6 })
  const testimonials = await getTestimonials(4)
  const latestBlogs = await getBlogs({ limit: 3 })
  const stats = await getResultStatistics()
  const googleReviews = await getGoogleReviews()
  const hpConfig = settings?.homepage_config || {}

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="animate-fade-in" style={{ 
        padding: '6rem 0', 
        position: 'relative', 
        overflow: 'hidden',
        backgroundImage: `linear-gradient(rgba(10, 37, 64, 0.85), rgba(10, 37, 64, 0.9)), url(${hpConfig.hero_image || 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop'})`,

        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', right: '-10%', top: '-20%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(245,181,27,0.1) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
        
        <div className="container-ka" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>
            <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
              <span className="section-label animate-fade-in-up" style={{ color: 'var(--gold)', animationDelay: '0.1s' }}>
                {hpConfig.hero_label || 'Welcome to Karmayogi Academy'}
              </span>
              <h1
                className="animate-fade-in-up"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                  fontWeight: 800,
                  color: 'white',
                  lineHeight: 1.15,
                  marginBottom: '1.5rem',
                  animationDelay: '0.2s',
                }}
              >
                {settings?.hero_tagline || 'Emerging as Officers, The Future is Unveiled'}
              </h1>
              <p
                className="animate-fade-in-up"
                style={{
                  fontSize: '1.125rem',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6,
                  marginBottom: '2.5rem',
                  animationDelay: '0.3s',
                }}
              >
                {settings?.hero_subtitle || 'Prepare for Rajyaseva, PSI, STI, ASO, Saralseva & Talathi Bharti with experienced post-holder faculty and a proven 52-week system.'}
              </p>
              
              <div className="animate-fade-in-up" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.4s' }}>
                <Link href="/courses" className="btn-primary" style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}>
                  Explore Courses
                </Link>
                <Link href="/contact" className="btn-outline-white" style={{ padding: '0.875rem 2.5rem', fontSize: '1rem' }}>
                  Contact Us
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="animate-fade-in-up" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3.5rem', animationDelay: '0.5s' }}>
                {(hpConfig.hero_trust_indicators || 'Post-Holder Faculty, 52-Week System, Personal Mentorship').split(',').map((indicator, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', fontSize: '0.875rem', fontWeight: 600 }}>
                    <CheckCircle size={18} style={{ color: 'var(--gold)' }} /> {indicator.trim()}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      {stats && stats.length > 0 && (
        <section style={{ padding: '3rem 0', background: 'white', borderBottom: '1px solid var(--border)' }}>
          <div className="container-ka">
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem' }}>
              {stats.map((stat, i) => (
                <div key={stat.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', flex: '1 1 200px', padding: '1rem' }}>
                  <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--orange)', fontFamily: 'Playfair Display, serif', marginBottom: '0.5rem' }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.375rem' }}>
                    {stat.label}
                  </div>
                  {stat.description && (
                    <div style={{ fontSize: '0.8125rem', color: 'var(--gray-600)', lineHeight: 1.5, maxWidth: '200px' }}>
                      {stat.description}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. ABOUT SNIPPET */}
      <section className="section-py bg-light">
        <div className="container-ka">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            {/* Left: Images */}
            <div style={{ position: 'relative', height: '400px' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '70%', height: '80%', background: 'var(--navy)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: 'url(/api/placeholder/600/500)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }} />
              </div>
              <div style={{ position: 'absolute', bottom: 0, right: 0, width: '60%', height: '70%', background: 'var(--orange)', borderRadius: 'var(--radius-lg)', border: '6px solid var(--light-bg)', overflow: 'hidden', zIndex: 2 }}>
                <div style={{ width: '100%', height: '100%', background: 'url(/api/placeholder/500/400)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.8 }} />
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 100, height: 100, background: 'var(--gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3, boxShadow: 'var(--shadow-lg)' }}>
                <div style={{ textAlign: 'center', color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, display: 'block', lineHeight: 1 }}>3+</span>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700 }}>Years of Trust</span>
                </div>
              </div>
            </div>

            {/* Right: Content */}
            <div>
              <span className="section-label">{hpConfig.about_label || 'About Karmayogi Academy'}</span>
              <h2 className="section-heading" style={{ marginBottom: '1.5rem' }}>
                {hpConfig.about_heading || "Maharashtra's Premier MPSC Coaching Institute"}
              </h2>
              <p style={{ color: 'var(--gray-700)', lineHeight: 1.7, marginBottom: '1.5rem', fontSize: '1.0625rem' }}>
                {hpConfig.about_text || 'Founded with a vision to create honest, dedicated, and competent officers for Maharashtra, Karmayogi Academy stands apart through its unique approach to competitive exam preparation.'}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(31,66,149,0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--blue)' }}>
                    <GraduationCap size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>Learn from Post-Holders</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>Our faculty consists of individuals who have successfully cleared the exams they teach.</p>
                  </div>
                </li>
                <li style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <div style={{ background: 'rgba(244,90,10,0.1)', padding: '0.5rem', borderRadius: '50%', color: 'var(--orange)' }}>
                    <BookOpen size={20} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>52-Week Structured System</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6 }}>A comprehensive, day-by-day study framework covering everything from basics to mains.</p>
                  </div>
                </li>
              </ul>
              <Link href="/about" className="btn-secondary">
                Read Our Story <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FEATURED COURSES */}
      <section className="section-py bg-white">
        <div className="container-ka">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ maxWidth: 600 }}>
              <span className="section-label">Our Courses</span>
              <h2 className="section-heading">Targeted Batches for Sure Success</h2>
            </div>
            <Link href="/courses" className="btn-secondary">
              View All Courses
            </Link>
          </div>

          {featuredCourses.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
              {featuredCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--light-bg)', borderRadius: 'var(--radius-lg)' }}>
              No featured courses available at the moment.
            </div>
          )}
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Features grid) */}
      <section className="section-py" style={{ background: 'var(--navy)', color: 'white' }}>
        <div className="container-ka">
          <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 4rem' }}>
            <span className="section-label" style={{ color: 'var(--gold)' }}>Why Karmayogi?</span>
            <h2 className="section-heading-white">The Karmayogi Advantage</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: Users, title: 'Expert Post-Holder Faculty', desc: 'Guidance from officers who understand the real examination mindset.' },
              { icon: BookOpen, title: 'Updated Study Material', desc: 'Notes and resources curated precisely according to the latest MPSC syllabus.' },
              { icon: Award, title: 'Weekly Mock Tests', desc: 'Rigorous testing environment for both prelims and mains formats.' },
              { icon: Building2, title: 'Modern Infrastructure', desc: 'AC classrooms, digital boards, and a dedicated reading room.' },
            ].map((feature, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center' }}>
                <div style={{ width: 60, height: 60, background: 'var(--orange)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white' }}>
                  <feature.icon size={28} />
                </div>
                <h4 style={{ fontSize: '1.125rem', color: 'white', marginBottom: '0.75rem' }}>{feature.title}</h4>
                <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      {testimonials.length > 0 && (
        <section className="section-py bg-light">
          <div className="container-ka">
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 3rem' }}>
              <span className="section-label">Success Stories</span>
              <h2 className="section-heading">What Our Students Say</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {testimonials.map(testimonial => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* YOUTUBE SECTION */}
      <YouTubeSection />

      {/* 7. LATEST BLOGS */}
      {latestBlogs.length > 0 && (
        <section className="section-py bg-white">
          <div className="container-ka">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ maxWidth: 600 }}>
                <span className="section-label">Exam Updates</span>
                <h2 className="section-heading">Latest from Our Blog</h2>
              </div>
              <Link href="/blog" className="btn-secondary">
                Read All Posts
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {latestBlogs.map(blog => (
                <Link key={blog.id} href={`/blog/${blog.slug}`} className="card" style={{ display: 'flex', flexDirection: 'column' }}>
                  {blog.featured_image && (
                    <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
                      <Image src={blog.featured_image} alt={blog.title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--orange)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                      {blog.blog_categories?.name || 'Article'}
                    </div>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '0.75rem', lineHeight: 1.4 }}>
                      {blog.title}
                    </h3>
                    {blog.excerpt && (
                      <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', lineHeight: 1.6, marginBottom: '1.5rem', flex: 1 }}>
                        {blog.excerpt.substring(0, 120)}...
                      </p>
                    )}
                    <div style={{ fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Reviews FROM GMB*/}
      {googleReviews && googleReviews.length > 0 && (
        <section className="section-py bg-light">
          <div className="container-ka">
            <div style={{ textAlign: 'center', maxWidth: 800, margin: '0 auto 3rem' }}>
              <span className="section-label">Reviews FROM GOOGLE</span>
              <h2 className="section-heading">What Our Students Say on Google</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
              {googleReviews.map(review => (
                <TestimonialCard key={review.id} testimonial={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA SECTION */}
      <section className="bg-hero-gradient" style={{ padding: '5rem 0', textAlign: 'center' }}>
        <div className="container-ka">
          <h2 className="section-heading-white" style={{ marginBottom: '1.5rem' }}>Ready to Begin Your Preparation?</h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.125rem', maxWidth: 600, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
            Join Maharashtra&apos;s premier MPSC coaching institute and take the first step towards your career as a gazetted officer.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/enroll" className="btn-primary" style={{ fontSize: '1.0625rem', padding: '1rem 2.5rem' }}>
              Enroll Now
            </Link>
            <Link href="/contact" className="btn-outline-white" style={{ fontSize: '1.0625rem', padding: '1rem 2.5rem' }}>
              Request a Callback
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
