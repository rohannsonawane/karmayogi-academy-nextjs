import { getSiteSettings } from '@/lib/queries/settings';
import { updateAboutPage } from '@/lib/actions/admin-about';
import AboutAdminClient from './AboutAdminClient';

export const metadata = { title: 'About Page' };

export default async function AboutAdminPage() {
  const settings = await getSiteSettings();
  const about = settings?.about_page ?? {};

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{
          fontSize: '1.5rem', fontWeight: 700,
          color: 'var(--navy)', fontFamily: 'Playfair Display, serif',
        }}>
          About Page
        </h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
          Edit every section of the public About page — changes go live instantly on save.
        </p>
      </div>

      <AboutAdminClient initialAbout={about} onSubmit={updateAboutPage} />
    </div>
  );
}
