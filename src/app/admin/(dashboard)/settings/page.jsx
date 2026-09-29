import { getSiteSettings } from '@/lib/queries/settings';
import { updateSiteSettings } from '@/lib/actions/admin-settings';
import SettingsClient from './SettingsClient';

export const metadata = { title: 'Site Settings' };

export default async function SettingsAdminPage() {
  const settings = await getSiteSettings();

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Site Settings</h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Manage global website information and content</p>
      </div>

      <SettingsClient initialSettings={settings} onSubmit={updateSiteSettings} />
    </div>
  );
}
