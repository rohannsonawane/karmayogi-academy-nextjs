/**
 * Google Tag Manager / GA4 dataLayer helpers.
 * Configure GA4 tags in GTM to fire on these custom events and dataLayer keys.
 */

export function pushDataLayer(payload) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

function getSessionId() {
  try {
    let id = sessionStorage.getItem('ka_session_id');
    if (!id) {
      id =
        typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : `sess_${Date.now()}_${Math.random().toString(36).slice(2)}`;
      sessionStorage.setItem('ka_session_id', id);
    }
    return id;
  } catch {
    return undefined;
  }
}

function baseContext() {
  return {
    session_id: getSessionId(),
    timestamp: new Date().toISOString(),
  };
}

export function trackEvent(eventName, params = {}) {
  pushDataLayer({
    event: eventName,
    ...baseContext(),
    ...params,
  });

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
}

export function trackPageView({ path, title, search = '' }) {
  const pagePath = search ? `${path}${search}` : path;
  const location =
    typeof window !== 'undefined' ? window.location.href : undefined;

  pushDataLayer({
    event: 'page_view',
    ...baseContext(),
    page_path: pagePath,
    page_title: title || document.title,
    page_location: location,
  });

  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (gaId && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_title: title || document.title,
      page_location: location,
    });
  }
}

export function trackGenerateLead({ formName, course, hasEmail }) {
  trackEvent('generate_lead', {
    form_name: formName,
    course_interest: course,
    has_email: Boolean(hasEmail),
    currency: 'INR',
    value: 1,
  });
}

export function trackWhatsAppClick({ placement = 'floating_button' } = {}) {
  trackEvent('whatsapp_click', {
    link_type: 'whatsapp',
    placement,
  });
}

export function trackOutboundClick({ url, linkText }) {
  trackEvent('outbound_click', {
    link_url: url,
    link_text: linkText?.slice(0, 100),
  });
}

export function trackScrollDepth({ percent, path }) {
  trackEvent('scroll_depth', {
    scroll_percentage: percent,
    page_path: path,
  });
}

export function trackEngagementTime({ seconds, path }) {
  trackEvent('engagement_time', {
    engagement_time_seconds: seconds,
    page_path: path,
  });
}

export function trackFormStart({ formName, formId }) {
  trackEvent('form_start', {
    form_name: formName,
    form_id: formId,
  });
}

export function trackClick({ element, label, href }) {
  trackEvent('ui_click', {
    element,
    click_label: label?.slice(0, 100),
    link_url: href,
  });
}
