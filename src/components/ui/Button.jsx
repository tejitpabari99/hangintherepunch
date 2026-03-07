import React from 'react';

/**
 * Reusable CTA button with consistent styling.
 * Supports primary (filled gold) and secondary (outlined) variants.
 *
 * @param {'primary'|'secondary'} variant - visual style
 * @param {string} className - additional classes
 * @param {React.ReactNode} children
 */
export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}) {
  return (
    <button
      className={`btn btn--${variant} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
