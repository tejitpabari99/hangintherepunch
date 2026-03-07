import { useEffect, useRef, useState } from 'react';

/**
 * Low-level Intersection Observer hook.
 * Returns [ref, entry] — attach ref to the target element.
 *
 * @param {IntersectionObserverInit} options - threshold, rootMargin, root
 * @param {boolean} once - if true, unobserves after first intersection (default: true)
 */
export default function useIntersectionObserver(options = {}, once = true) {
  const ref = useRef(null);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([e]) => {
      setEntry(e);
      // Stop observing once visible — avoids unnecessary recalculations
      if (once && e.isIntersecting) {
        observer.unobserve(el);
      }
    }, options);

    observer.observe(el);
    return () => observer.disconnect();
    // Stringify options to avoid infinite re-renders from object identity changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(options), once]);

  return [ref, entry];
}
