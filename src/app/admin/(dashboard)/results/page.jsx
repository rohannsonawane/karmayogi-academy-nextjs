import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { BarChart3 } from 'lucide-react';
import ResultsClient from './ResultsClient';

export const metadata = { title: 'Results' };

export default async function ResultsAdminPage() {
  const supabase = await createClient();
  const { data: results } = await supabase
    .from('results')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>Results</h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginTop: '0.25rem' }}>Student achievers</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <Link href="/admin/results/statistics" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.625rem 1.25rem', background: 'white', color: 'var(--navy)', borderRadius: '8px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none', border: '1.5px solid var(--border)' }}>
            <BarChart3 size={15} /> Stats
          </Link>
        </div>
      </div>

      <ResultsClient results={results || []} />
    </div>
  );
}
