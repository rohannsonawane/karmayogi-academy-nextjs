import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { updateBlog } from '@/lib/actions/admin-blogs';
import BlogForm from '../../BlogForm';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Blog Post' };

export default async function EditBlogPage({ params }) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: blog }, { data: categories }] = await Promise.all([
    supabase.from('blogs').select('*, blog_categories(*)').eq('id', id).single(),
    supabase.from('blog_categories').select('*').order('display_order'),
  ]);

  if (!blog) notFound();

  const boundAction = updateBlog.bind(null, id);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/blogs" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Edit Post</h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>{blog.title}</p>
        </div>
      </div>
      <BlogForm categories={categories || []} onSubmit={boundAction} initialData={blog} />
    </div>
  );
}
