import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import StatsClient from './StatsClient';

export const metadata = { title: 'Result Statistics' };

export default async function ResultStatsPage() {
  const supabase = await createClient();
  const { data: stats } = await supabase
    .from('result_statistics')
    .select('*')
    .order('display_order');

  return (
    <div style={{ padding: '2rem', maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <Link
          href="/admin/results"
          style={{ display: 'flex', alignItems: 'center', padding: '6px', borderRadius: '8px', background: 'white', border: '1px solid var(--border)', color: 'var(--navy)', textDecoration: 'none' }}
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--navy)', fontFamily: 'Playfair Display, serif' }}>
            Homepage Statistics
          </h1>
          <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
            These numbers appear on the homepage stats bar — edit, reorder, or add new ones.
          </p>
        </div>
      </div>

      <StatsClient initialStats={stats || []} />
    </div>
  );
}

