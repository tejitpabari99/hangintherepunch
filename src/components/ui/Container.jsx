import React from 'react';

/**
 * Max-width centered container.
 * Keeps content readable on wide screens while being fluid on mobile.
 */
export default function Container({ className = '', children, ...props }) {
  return (
    <div
      className={`container ${className}`}
      style={{ maxWidth: 'var(--max-width)', margin: '0 auto', padding: '0 var(--space-lg)' }}
      {...props}
    >
      {children}
    </div>
  );
}
