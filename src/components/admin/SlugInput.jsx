'use client';

import { useEffect, useState } from 'react';

function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default function SlugInput({ titleValue, name = 'slug', defaultValue = '' }) {
  const [slug, setSlug] = useState(defaultValue);
  const [manuallyEdited, setManuallyEdited] = useState(!!defaultValue);

  useEffect(() => {
    if (!manuallyEdited && titleValue !== undefined) {
      setSlug(toSlug(titleValue));
    }
  }, [titleValue, manuallyEdited]);

  return (
    <div>
      <label className="form-label">
        URL Slug
        {!manuallyEdited && (
          <span style={{ color: 'var(--gray-400)', fontWeight: 400, marginLeft: 8, fontSize: '0.75rem' }}>
            (auto-generated)
          </span>
        )}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--gray-200)', borderRadius: '0.375rem', overflow: 'hidden' }}>
        <span style={{ padding: '0.625rem 0.75rem', background: 'var(--gray-100)', color: 'var(--gray-500)', fontSize: '0.8125rem', borderRight: '1.5px solid var(--gray-200)', whiteSpace: 'nowrap' }}>
          /
        </span>
        <input
          type="text"
          name={name}
          value={slug}
          onChange={(e) => {
            setSlug(e.target.value);
            setManuallyEdited(true);
          }}
          style={{
            flex: 1,
            padding: '0.625rem 0.875rem',
            border: 'none',
            outline: 'none',
            fontSize: '0.9375rem',
            color: 'var(--gray-800)',
            fontFamily: 'monospace',
          }}
          placeholder="url-slug-here"
          required
        />
        {manuallyEdited && (
          <button
            type="button"
            onClick={() => {
              setManuallyEdited(false);
              setSlug(toSlug(titleValue || ''));
            }}
            style={{
              padding: '0.625rem 0.75rem',
              background: 'none',
              border: 'none',
              color: 'var(--blue)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            Reset
          </button>
        )}
      </div>
    </div>
  );
}
