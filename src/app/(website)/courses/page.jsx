import PageHero from '@/components/website/PageHero';
import CoursesClient from '@/components/website/CoursesClient';
import { getCourses, getCourseCategories } from '@/lib/queries/courses';

export const metadata = {
  title: 'All MPSC Coaching Courses | Karmayogi Academy Nashik',
  description: 'Choose from structured 52-week post-holder led batches in Nashik for Rajyaseva, PSI, STI, ASO, Combined B&C, and Talathi Bharti.',
};

export default async function CoursesPage() {
  const [courses, categories] = await Promise.all([
    getCourses(),
    getCourseCategories(),
  ]);

  return (
    <div style={{ backgroundColor: '#FAF9F6', minHeight: '100vh' }}>
      <PageHero
        breadcrumb="COURSES"
        title="All MPSC Coaching Courses"
        subtitle="Choose from our structured 52-week post-holder led batches in Nashik."
      />

      <div className="container-ka" style={{ padding: '3.5rem 1rem' }}>
        <CoursesClient
          initialCourses={courses}
          categories={categories}
        />
      </div>
    </div>
  );
}
