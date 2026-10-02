'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  trackClick,
  trackEngagementTime,
  trackEvent,
  trackFormStart,
  trackOutboundClick,
  trackPageView,
  trackScrollDepth,
} from '@/lib/analytics/data-layer';

const SCROLL_MILESTONES = [25, 50, 75, 90, 100];
const ENGAGEMENT_INTERVAL_MS = 30_000;

function isExternalUrl(href) {
  if (!href || href.startsWith('#') || href.startsWith('/')) return false;
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false;
  try {
    const url = new URL(href, window.location.origin);
    return url.origin !== window.location.origin;
  } catch {
    return false;
  }
}

function isWhatsAppUrl(href) {
  return href?.includes('wa.me') || href?.includes('api.whatsapp.com');
}

export default function AnalyticsListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams?.toString() ? `?${searchParams.toString()}` : '';

  const scrollHitRef = useRef(new Set());
  const engagementStartRef = useRef(Date.now());
  const lastPathRef = useRef('');
  const formStartedRef = useRef(new Set());

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const pathKey = `${pathname}${search}`;
    if (lastPathRef.current === pathKey) return;
    lastPathRef.current = pathKey;

    scrollHitRef.current = new Set();
    engagementStartRef.current = Date.now();
    formStartedRef.current = new Set();

    trackPageView({
      path: pathname,
      title: document.title,
      search,
    });
  }, [pathname, search]);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const onScroll = () => {
      const doc = document.documentElement;
      const scrollTop = window.scrollY || doc.scrollTop;
      const height = doc.scrollHeight - doc.clientHeight;
      if (height <= 0) return;

      const percent = Math.min(100, Math.round((scrollTop / height) * 100));
      for (const milestone of SCROLL_MILESTONES) {
        if (percent >= milestone && !scrollHitRef.current.has(milestone)) {
          scrollHitRef.current.add(milestone);
          trackScrollDepth({ percent: milestone, path: pathname });
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [pathname]);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const tick = () => {
      const seconds = Math.round((Date.now() - engagementStartRef.current) / 1000);
      if (seconds > 0) {
        trackEngagementTime({ seconds, path: pathname });
      }
    };

    const interval = setInterval(tick, ENGAGEMENT_INTERVAL_MS);
    const onHidden = () => {
      if (document.visibilityState === 'hidden') tick();
    };
    const onPageHide = () => tick();

    document.addEventListener('visibilitychange', onHidden);
    window.addEventListener('pagehide', onPageHide);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onHidden);
      window.removeEventListener('pagehide', onPageHide);
      tick();
    };
  }, [pathname]);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const onClick = (e) => {
      const el = e.target.closest(
        'a[href], button, [data-analytics-event], [role="button"]',
      );
      if (!el) return;

      const customEvent = el.getAttribute('data-analytics-event');
      if (customEvent) {
        let params = {};
        const raw = el.getAttribute('data-analytics-params');
        if (raw) {
          try {
            params = JSON.parse(raw);
          } catch {
            /* ignore malformed JSON */
          }
        }
        trackEvent(customEvent, params);
        return;
      }

      const href = el.getAttribute('href');
      const label =
        el.getAttribute('aria-label') ||
        el.getAttribute('title') ||
        el.textContent?.trim();

      if (href && isWhatsAppUrl(href)) {
        trackEvent('whatsapp_click', {
          link_type: 'whatsapp',
          placement: el.dataset.analyticsPlacement || 'inline_link',
          link_url: href,
        });
        return;
      }

      if (href && isExternalUrl(href)) {
        trackOutboundClick({ url: href, linkText: label });
        return;
      }

      if (el.tagName === 'A' || el.tagName === 'BUTTON') {
        trackClick({
          element: el.tagName.toLowerCase(),
          label,
          href: href || undefined,
        });
      }
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname]);

  useEffect(() => {
    if (pathname?.startsWith('/admin')) return;

    const onFocusIn = (e) => {
      const field = e.target;
      if (!field?.closest('form')) return;
      const form = field.closest('form');
      const formId = form.id || form.getAttribute('name') || 'unnamed_form';
      if (formStartedRef.current.has(formId)) return;
      formStartedRef.current.add(formId);
      trackFormStart({
        formName: form.getAttribute('data-analytics-form') || formId,
        formId,
      });
    };

    document.addEventListener('focusin', onFocusIn);
    return () => document.removeEventListener('focusin', onFocusIn);
  }, [pathname]);

  return null;
}
