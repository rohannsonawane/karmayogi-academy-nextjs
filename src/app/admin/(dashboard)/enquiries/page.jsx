import { createClient } from '@/lib/supabase/server';
import EnquiriesClient from './EnquiriesClient';

export const metadata = { title: 'Enquiries' };

export default async function EnquiriesAdminPage() {
  const supabase = await createClient();
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*, courses(title)')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Enquiries</h1>
        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>{enquiries?.length || 0} total leads</p>
      </div>
      <EnquiriesClient initialEnquiries={enquiries || []} />
    </div>
  );
}
