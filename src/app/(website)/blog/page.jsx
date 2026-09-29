import PageHero from '@/components/website/PageHero';
import BlogClient from '@/components/website/BlogClient';
import { getBlogs, getBlogCategories } from '@/lib/queries/blogs';

export const metadata = {
  title: 'MPSC Exam Guidance & Updates | Karmayogi Academy Nashik',
  description: 'Insights, strategies, and recruitment notifications from Karmayogi mentors.',
};

export default async function BlogPage() {
  const [blogs, categories] = await Promise.all([
    getBlogs(),
    getBlogCategories(),
  ]);

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
      <PageHero
        breadcrumb="BLOG"
        title="MPSC Exam Guidance & Updates"
        subtitle="Insights, strategies, and recruitment notifications from Karmayogi mentors."
      />

      <div className="container-ka" style={{ padding: '3.5rem 1rem' }}>
        <BlogClient
          initialBlogs={blogs}
          categories={categories}
        />
      </div>
    </div>
  );
}
