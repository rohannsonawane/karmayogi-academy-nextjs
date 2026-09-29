import PageHero from '@/components/website/PageHero';
import ResourcesClient from '@/components/website/ResourcesClient';
import { getResources, getResourceCategories } from '@/lib/queries/resources';

export const metadata = {
  title: 'Free MPSC Study Resources | Karmayogi Academy Nashik',
  description: 'Download free MPSC Syllabus, PYQ papers, answer writing guides, and strategy notes.',
};

export default async function ResourcesPage() {
  const [resources, categories] = await Promise.all([
    getResources(),
    getResourceCategories(),
  ]);

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
      <PageHero
        breadcrumb="FREE RESOURCES"
        title="Free MPSC Study Resources"
        subtitle="All resources are free. Just share your name and mobile number to download instantly."
      />

      <div className="container-ka" style={{ padding: '3.5rem 1rem' }}>
        <ResourcesClient
          initialResources={resources}
          categories={categories}
        />
      </div>
    </div>
  );
}
