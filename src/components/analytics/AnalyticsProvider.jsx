import { Suspense } from 'react';
import AnalyticsListener from '@/components/analytics/AnalyticsListener';
import { isAnalyticsEnabled } from '@/components/analytics/GoogleTagManager';

export default function AnalyticsProvider() {
  if (!isAnalyticsEnabled()) return null;

  return (
    <Suspense fallback={null}>
      <AnalyticsListener />
    </Suspense>
  );
}
