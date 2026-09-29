import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import {
  BookOpen, FileText, GraduationCap, Award, Star, MessageSquare,
  FileArchive, TrendingUp, ArrowRight, Clock,
} from 'lucide-react';

export const metadata = { title: 'Dashboard' };

async function getDashboardStats(supabase) {
  const [courses, blogs, faculty, results, testimonials, resources, enquiries] = await Promise.all([
    supabase.from('courses').select('id', { count: 'exact' }),
    supabase.from('blogs').select('id', { count: 'exact' }),
    supabase.from('faculty').select('id', { count: 'exact' }),
    supabase.from('results').select('id', { count: 'exact' }),
    supabase.from('testimonials').select('id', { count: 'exact' }),
    supabase.from('resources').select('id', { count: 'exact' }),
    supabase.from('enquiries').select('id', { count: 'exact' }),
  ]);

  const newEnquiries = await supabase.from('enquiries').select('id', { count: 'exact' }).eq('status', 'new');

  return {
    courses: courses.count || 0,
    blogs: blogs.count || 0,
    faculty: faculty.count || 0,
    results: results.count || 0,
    testimonials: testimonials.count || 0,
    resources: resources.count || 0,
    enquiries: enquiries.count || 0,
    newEnquiries: newEnquiries.count || 0,
  };
}

const statCards = [
  { key: 'courses', label: 'Courses', icon: BookOpen, color: '#1F4295', href: '/admin/courses' },
  { key: 'blogs', label: 'Blog Posts', icon: FileText, color: '#F45A0A', href: '/admin/blogs' },
  { key: 'faculty', label: 'Faculty', icon: GraduationCap, color: '#0B1B41', href: '/admin/faculty' },
  { key: 'results', label: 'Results', icon: Award, color: '#F5B51B', href: '/admin/results' },
  { key: 'testimonials', label: 'Testimonials', icon: Star, color: '#7c3aed', href: '/admin/testimonials' },
  { key: 'resources', label: 'Resources', icon: FileArchive, color: '#059669', href: '/admin/resources' },
  { key: 'enquiries', label: 'Enquiries', icon: MessageSquare, color: '#dc2626', href: '/admin/enquiries', highlight: 'newEnquiries', highlightLabel: 'new' },
];

const STATUS_COLORS = {
  new: { bg: '#dbeafe', text: '#1e40af' },
  contacted: { bg: '#dcfce7', text: '#166534' },
  follow_up: { bg: '#fef9c3', text: '#854d0e' },
  converted: { bg: '#d1fae5', text: '#065f46' },
  closed: { bg: '#f3f4f6', text: '#374151' },
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const stats = await getDashboardStats(supabase);

  const { data: recentEnquiries } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  const { data: recentBlogs } = await supabase
    .from('blogs')
    .select('id, title, is_published, created_at')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div style={{ padding: '2rem' }}>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif', marginBottom: '0.25rem' }}>
          Dashboard
        </h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.9375rem' }}>
          Welcome back! Here&apos;s an overview of your content.
        </p>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards.map(({ key, label, icon: Icon, color, href, highlight, highlightLabel }) => (
          <Link key={key} href={href} className="card" style={{
            display: 'block',
            padding: '1.25rem',
            textDecoration: 'none',
            position: 'relative',
          }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', background: color, borderRadius: '4px 0 0 4px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy)', fontFamily: 'Playfair Display, serif', lineHeight: 1 }}>
                  {stats[key]}
                </div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--gray-500)', fontWeight: 500, marginTop: '0.25rem' }}>{label}</div>
                {highlight && stats[highlight] > 0 && (
                  <div style={{ fontSize: '0.75rem', color: color, fontWeight: 600, marginTop: '0.25rem' }}>
                    {stats[highlight]} {highlightLabel}
                  </div>
                )}
              </div>
              <div style={{ width: 40, height: 40, background: `${color}15`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={20} color={color} />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Enquiries & Quick Links */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '1.5rem', alignItems: 'start' }}>
        {/* Recent Enquiries */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
          <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Recent Enquiries</h2>
            <Link href="/admin/enquiries" style={{ fontSize: '0.8125rem', color: 'var(--blue)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              View all <ArrowRight size={13} />
            </Link>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'var(--light-bg)' }}>
                  {['Name', 'Mobile', 'Course', 'Status', 'Date'].map(h => (
                    <th key={h} style={{ padding: '0.625rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {(recentEnquiries || []).map((enq, i) => {
                  const sc = STATUS_COLORS[enq.status] || STATUS_COLORS.new;
                  return (
                    <tr key={enq.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap' }}>{enq.full_name}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>{enq.mobile}</td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{enq.course_name || '—'}</td>
                      <td style={{ padding: '0.75rem 1rem' }}>
                        <span style={{ background: sc.bg, color: sc.text, padding: '0.15rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'capitalize' }}>
                          {enq.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>
                        {new Date(enq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                      </td>
                    </tr>
                  );
                })}
                {(!recentEnquiries || recentEnquiries.length === 0) && (
                  <tr><td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--gray-400)', fontSize: '0.875rem' }}>No enquiries yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Quick Actions */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Quick Actions</h2>
            </div>
            <div style={{ padding: '0.75rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { href: '/admin/courses/new', label: '+ New Course', icon: BookOpen },
                { href: '/admin/blogs/new', label: '+ New Blog Post', icon: FileText },
                { href: '/admin/faculty/new', label: '+ Add Faculty', icon: GraduationCap },
                { href: '/admin/results/statistics', label: 'Manage Stats', icon: TrendingUp },
                { href: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
              ].map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href} className="hover:bg-[var(--light-bg)]" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.625rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '8px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: 'var(--navy)',
                  textDecoration: 'none',
                  transition: 'background 0.15s ease',
                }}
                >
                  {typeof Icon === 'string' ? <span>{Icon}</span> : <Icon size={15} color="var(--orange)" />}
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Blog Posts */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)' }}>Recent Posts</h2>
              <Link href="/admin/blogs" style={{ fontSize: '0.75rem', color: 'var(--blue)' }}>View all</Link>
            </div>
            <div style={{ padding: '0.75rem' }}>
              {(recentBlogs || []).map((blog) => (
                <Link key={blog.id} href={`/admin/blogs/${blog.id}/edit`} className="hover:bg-[var(--light-bg)]" style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem 0.5rem',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
                >
                  <span style={{ fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 500, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{blog.title}</span>
                  <span style={{
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    padding: '0.1rem 0.4rem',
                    borderRadius: '4px',
                    background: blog.is_published ? '#dcfce7' : '#f3f4f6',
                    color: blog.is_published ? '#166534' : '#6b7280',
                  }}>
                    {blog.is_published ? 'Live' : 'Draft'}
                  </span>
                </Link>
              ))}
              {(!recentBlogs || recentBlogs.length === 0) && (
                <p style={{ color: 'var(--gray-400)', fontSize: '0.8125rem', textAlign: 'center', padding: '1rem' }}>No posts yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
