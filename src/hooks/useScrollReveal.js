import { useMemo } from 'react';
import useIntersectionObserver from './useIntersectionObserver';

/**
 * Scroll-reveal hook: returns [ref, isVisible].
 * Wraps useIntersectionObserver with sensible defaults for
 * fade-in-on-scroll animations. Fires once so the element
 * stays visible after it enters the viewport.
 *
 * @param {object} opts
 * @param {number} opts.threshold - visibility fraction to trigger (default 0.15)
 * @param {string} opts.rootMargin - shrink/expand the trigger zone
 */
export default function useScrollReveal({
  threshold = 0.15,
  rootMargin = '0px 0px -50px 0px',
} = {}) {
  const options = useMemo(
    () => ({ threshold, rootMargin }),
    [threshold, rootMargin]
  );

  const [ref, entry] = useIntersectionObserver(options, true);
  const isVisible = entry?.isIntersecting ?? false;

  return [ref, isVisible];
}
