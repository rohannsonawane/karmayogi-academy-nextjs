import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { toggleBlogPublish, deleteBlog } from '@/lib/actions/admin-blogs';
import { Plus, Pencil, Eye, EyeOff, Trash2 } from 'lucide-react';

export const metadata = { title: 'Blogs' };

export default async function BlogsAdminPage() {
  const supabase = await createClient();
  const { data: blogs } = await supabase
    .from('blogs')
    .select('*, blog_categories(name)')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Blog Posts</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{blogs?.length || 0} posts total</p>
        </div>
        <Link href="/admin/blogs/new" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'var(--orange)', color: 'white', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>
          <Plus size={16} /> New Post
        </Link>
      </div>

      <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border)', boxShadow: 'var(--shadow)', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--light-bg)' }}>
                {['Title', 'Category', 'Author', 'Status', 'Date', 'Actions'].map(h => (
                  <th key={h} style={{ padding: '0.75rem 1rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 600, color: 'var(--gray-600)', textTransform: 'uppercase', letterSpacing: '0.04em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(blogs || []).map((blog, i) => (
                <tr key={blog.id} style={{ borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--navy)', maxWidth: 280, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--gray-400)', fontFamily: 'monospace', marginTop: '2px' }}>/{blog.slug}</div>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)' }}>
                    {blog.blog_categories?.name || '—'}
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--gray-600)', whiteSpace: 'nowrap' }}>
                    {blog.author}
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <form action={async () => { 'use server'; await toggleBlogPublish(blog.id, blog.is_published); }}>
                      <button type="submit" style={{
                        display: 'flex', alignItems: 'center', gap: '0.375rem',
                        padding: '0.2rem 0.625rem', borderRadius: '9999px', border: 'none', cursor: 'pointer',
                        background: blog.is_published ? '#dcfce7' : '#f3f4f6',
                        color: blog.is_published ? '#166534' : '#6b7280',
                        fontSize: '0.75rem', fontWeight: 600,
                      }}>
                        {blog.is_published ? <><Eye size={12} /> Published</> : <><EyeOff size={12} /> Draft</>}
                      </button>
                    </form>
                  </td>
                  <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', color: 'var(--gray-500)', whiteSpace: 'nowrap' }}>
                    {new Date(blog.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '0.875rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <Link href={`/admin/blogs/${blog.id}/edit`} style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: 'var(--light-bg)', color: 'var(--navy)', textDecoration: 'none' }}>
                        <Pencil size={14} />
                      </Link>
                      <form action={async () => { 'use server'; await deleteBlog(blog.id); }}>
                        <button type="submit" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '6px', background: '#fee2e2', color: '#991b1b', border: 'none', cursor: 'pointer' }}>
                          <Trash2 size={14} />
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
              {(!blogs || blogs.length === 0) && (
                <tr>
                  <td colSpan={6} style={{ padding: '3rem', textAlign: 'center', color: 'var(--gray-400)' }}>
                    No blog posts yet. <Link href="/admin/blogs/new" style={{ color: 'var(--blue)' }}>Write the first one</Link>.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
