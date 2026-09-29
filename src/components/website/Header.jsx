'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { Phone, MapPin, Menu, X, ChevronDown, Star } from 'lucide-react';

const navLinks = [
{ label: 'Home', href: '/' },
{ label: 'About', href: '/about' },
{
  label: 'Courses',
  href: '/courses',
  dropdown: [
  { label: 'MPSC Foundation Batch', href: '/courses/mpsc-foundation-batch' },
  { label: 'ASO Exam Coaching', href: '/courses/aso-exam-coaching' },
  { label: 'Rajyaseva Classes', href: '/courses/rajyaseva-classes-in-nashik' },
  { label: 'Saralseva Coaching', href: '/courses/saralseva' },
  { label: 'SR Exam Coaching', href: '/courses/sr-exam-coaching' },
  { label: 'PSI Classes', href: '/courses/psi-classes-in-nashik' },
  { label: 'Combined Group B & C', href: '/courses/mpsc-combine-group-b-and-c' },
  { label: 'Talathi Bharti', href: '/courses/talathi-bharti' }]

},
{ label: 'Faculty', href: '/faculty' },
{ label: 'Results', href: '/results' },
{ label: 'Blog', href: '/blog' },
{ label: 'Resources', href: '/resources' },
{ label: 'Contact', href: '/contact' }];


export default function Header({ logoUrl }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [mobileCourseOpen, setMobileCourseOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
    setCoursesOpen(false);
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ boxShadow: scrolled ? '0 2px 20px rgba(11,27,65,0.15)' : 'none', transition: 'box-shadow 0.3s ease' }}>
      
      {/* Top Bar */}
      <div style={{ background: 'var(--navy)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container-ka" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          {/* Left: Phone + Location */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <a
              href="tel:+919325589491"
              style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'white', fontSize: '0.8125rem', fontWeight: 500 }}>
              
              <Phone size={13} style={{ color: 'var(--gold)' }} />
              +91 93255 89491
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8125rem' }}>
              <MapPin size={13} style={{ color: 'var(--gold)' }} />
              Ashok Stambh, Nashik
            </span>
          </div>
          {/* Right: Admission notice + CTA */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', color: 'var(--gold)', fontSize: '0.8125rem', fontWeight: 600 }}>
              <Star size={12} />
              Admissions Open for 2026-27 Batches
            </span>
            <Link
              href="/enroll"
              style={{
                background: 'var(--orange)',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.3rem 0.9rem',
                borderRadius: '0.25rem',
                transition: 'background 0.2s ease'
              }}>
              
              Enroll Now
            </Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        style={{
          background: 'white',
          borderBottom: '2px solid var(--light-bg)'
        }}>
        
        <div
          className="container-ka"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.75rem 1.25rem', gap: '1rem' }}>
          
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', textDecoration: 'none', flexShrink: 0 }}>
            {logoUrl ? (
              <Image
                src={logoUrl}
                alt="Karmayogi Academy Logo"
                width={46}
                height={46}
                style={{ borderRadius: 8, objectFit: 'contain', flexShrink: 0 }}
              />
            ) : (
              <div
                style={{
                  width: 46,
                  height: 46,
                  background: 'var(--navy)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold)',
                  fontWeight: 800,
                  fontSize: '1.1rem',
                  fontFamily: 'Playfair Display, serif',
                  flexShrink: 0
                }}>
                KY
              </div>
            )}
            <div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontWeight: 800, fontSize: '1.125rem', color: 'var(--navy)', lineHeight: 1.1 }}>
                KARMAYOGI
              </div>
              <div style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--orange)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                ACADEMY NASHIK
              </div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', listStyle: 'none' }} className="hidden lg:flex">
            {navLinks.map((link) =>
            link.dropdown ?
            <div key={link.label} ref={dropdownRef} style={{ position: 'relative' }}>
                  <button
                onClick={() => setCoursesOpen((v) => !v)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  padding: '0.5rem 0.75rem',
                  fontSize: '0.9rem',
                  fontWeight: isActive(link.href) ? 700 : 500,
                  color: isActive(link.href) ? 'var(--orange)' : 'var(--navy)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: '0.25rem',
                  transition: 'color 0.15s',
                  borderBottom: isActive(link.href) ? '2px solid var(--orange)' : '2px solid transparent'
                }}>
                
                    {link.label}
                    <ChevronDown
                  size={15}
                  style={{ transition: 'transform 0.2s', transform: coursesOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
                
                  </button>
                  {coursesOpen &&
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '0.5rem',
                  boxShadow: 'var(--shadow-xl)',
                  minWidth: 240,
                  zIndex: 100,
                  padding: '0.5rem',
                  animation: 'fadeIn 0.15s ease'
                }}>
                
                      {link.dropdown.map((item) =>
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: 'block',
                    padding: '0.5rem 0.875rem',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    color: pathname === item.href ? 'var(--orange)' : 'var(--gray-700)',
                    borderRadius: '0.375rem',
                    transition: 'background 0.15s, color 0.15s',
                    background: pathname === item.href ? 'var(--light-bg)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    ;e.target.style.background = 'var(--light-bg)';
                    e.target.style.color = 'var(--orange)';
                  }}
                  onMouseLeave={(e) => {
                    ;e.target.style.background = pathname === item.href ? 'var(--light-bg)' : 'transparent';
                    e.target.style.color = pathname === item.href ? 'var(--orange)' : 'var(--gray-700)';
                  }}>
                  
                          › {item.label}
                        </Link>
                )}
                    </div>
              }
                </div> :

            <Link
              key={link.label}
              href={link.href}
              style={{
                padding: '0.5rem 0.75rem',
                fontSize: '0.9rem',
                fontWeight: isActive(link.href) ? 700 : 500,
                color: isActive(link.href) ? 'var(--orange)' : 'var(--navy)',
                borderRadius: '0.25rem',
                transition: 'color 0.15s',
                borderBottom: isActive(link.href) ? '2px solid var(--orange)' : '2px solid transparent',
                display: 'block'
              }}>
              
                  {link.label}
                </Link>

            )}
          </div>

          {/* Desktop CTA */}
          <Link href="/enroll" className="btn-primary hidden lg:inline-flex" style={{ fontSize: '0.875rem', padding: '0.6rem 1.4rem' }}>
            Enroll Now
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--navy)', padding: '0.25rem' }}
            aria-label="Toggle menu">
            
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen &&
        <div
          className="lg:hidden"
          style={{
            background: 'white',
            borderTop: '1px solid var(--border)',
            padding: '1rem 1.25rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
            animation: 'fadeInUp 0.2s ease'
          }}>
          
            {navLinks.map((link) =>
          link.dropdown ?
          <div key={link.label}>
                  <button
              onClick={() => setMobileCourseOpen((v) => !v)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1rem',
                fontSize: '0.9375rem',
                fontWeight: 600,
                color: 'var(--navy)',
                background: 'var(--light-bg)',
                border: 'none',
                borderRadius: '0.375rem',
                cursor: 'pointer'
              }}>
              
                    {link.label}
                    <ChevronDown
                size={16}
                style={{ transition: 'transform 0.2s', transform: mobileCourseOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
              
                  </button>
                  {mobileCourseOpen &&
            <div style={{ paddingLeft: '1rem', display: 'flex', flexDirection: 'column', gap: '0.125rem', marginTop: '0.25rem' }}>
                      {link.dropdown.map((item) =>
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'block',
                  padding: '0.5rem 1rem',
                  fontSize: '0.875rem',
                  color: 'var(--gray-700)',
                  borderRadius: '0.375rem'
                }}>
                
                          › {item.label}
                        </Link>
              )}
                    </div>
            }
                </div> :

          <Link
            key={link.label}
            href={link.href}
            style={{
              display: 'block',
              padding: '0.75rem 1rem',
              fontSize: '0.9375rem',
              fontWeight: isActive(link.href) ? 700 : 500,
              color: isActive(link.href) ? 'var(--orange)' : 'var(--navy)',
              background: isActive(link.href) ? 'rgba(244,90,10,0.06)' : 'transparent',
              borderRadius: '0.375rem',
              borderLeft: isActive(link.href) ? '3px solid var(--orange)' : '3px solid transparent',
              transition: 'all 0.15s'
            }}>
            
                  {link.label}
                </Link>

          )}
            <Link
            href="/enroll"
            className="btn-primary"
            style={{ marginTop: '0.5rem', textAlign: 'center' }}>
            
              Enroll Now
            </Link>
          </div>
        }
      </nav>
    </header>);

}