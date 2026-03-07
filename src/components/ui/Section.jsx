import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

/**
 * Full-viewport section wrapper with optional scroll-reveal animation.
 * Adds a `visible` class when the section enters the viewport,
 * which CSS can target for fade-in / slide-up transitions.
 *
 * @param {boolean} reveal - enable scroll-triggered visibility (default true)
 * @param {string} className - additional classes
 */
export default function Section({
  reveal = true,
  className = '',
  children,
  style,
  ...props
}) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section
      ref={reveal ? ref : undefined}
      className={`${className} ${reveal && isVisible ? 'visible' : ''}`}
      style={style}
      {...props}
    >
      {children}
    </section>
  );
}
