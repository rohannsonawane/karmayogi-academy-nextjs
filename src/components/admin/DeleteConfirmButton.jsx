'use client';

import { Trash2 } from 'lucide-react';

export default function DeleteConfirmButton({ itemType = 'item' }) {
  return (
    <button
      type="submit"
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '6px',
        borderRadius: '6px',
        background: '#fee2e2',
        color: '#991b1b',
        border: 'none',
        cursor: 'pointer'
      }}
      onClick={(e) => {
        if (!window.confirm(`Delete this ${itemType}?`)) {
          e.preventDefault();
        }
      }}
    >
      <Trash2 size={14} />
    </button>
  );
}
