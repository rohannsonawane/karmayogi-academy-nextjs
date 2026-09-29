import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { createBlog } from '@/lib/actions/admin-blogs';
import BlogForm from '../BlogForm';

export const metadata = { title: 'New Blog Post' };

export default async function NewBlogPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase.from('blog_categories').select('*').order('display_order');

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link href="/admin/blogs" style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}>
          <ArrowLeft size={18} />
        </Link>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>New Blog Post</h1>
      </div>
      <BlogForm categories={categories || []} onSubmit={createBlog} />
    </div>
  );
}
