import React, { useState, useEffect, useRef } from 'react';

/**
 * Animated counter showing total hugs and countries
 * Features count-up animation with easing
 */
export default function HugCounter({ totalHugs, totalCountries }) {
  const [displayHugs, setDisplayHugs] = useState(0);
  const [displayCountries, setDisplayCountries] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef(null);

  // Animate numbers with easing
  const animateCount = (start, end, duration, callback) => {
    const startTime = performance.now();
    const difference = end - start;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const currentValue = Math.round(start + difference * easedProgress);
      
      callback(currentValue);
      
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  // Intersection observer for scroll-triggered animation
  useEffect(() => {
    if (!counterRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          // Animate hugs count
          animateCount(0, totalHugs, 2000, setDisplayHugs);
          
          // Animate countries count with slight delay
          setTimeout(() => {
            animateCount(0, totalCountries, 1500, setDisplayCountries);
          }, 500);
        }
      },
      { threshold: 0.5, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(counterRef.current);

    return () => observer.disconnect();
  }, [totalHugs, totalCountries, hasAnimated]);

  // Update immediately if numbers change after initial animation
  useEffect(() => {
    if (hasAnimated) {
      setDisplayHugs(totalHugs);
      setDisplayCountries(totalCountries);
    }
  }, [totalHugs, totalCountries, hasAnimated]);

  // Format large numbers
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <div 
      ref={counterRef}
      className="hug-counter"
      role="region"
      aria-label={`${totalHugs} hugs from ${totalCountries} countries`}
      aria-live="polite"
    >
      <div className="hug-counter__content">
        <span className="hug-counter__emoji">🤗</span>
        <div className="hug-counter__numbers">
          <span className="hug-counter__hugs">
            <span className="hug-counter__number">{formatNumber(displayHugs)}</span>
            <span className="hug-counter__label">hugs from</span>
          </span>
          <span className="hug-counter__countries">
            <span className="hug-counter__number">{displayCountries}</span>
            <span className="hug-counter__label">countries</span>
          </span>
        </div>
      </div>
      
      <style jsx>{`
        .hug-counter {
          background: #2A2420;
          padding: var(--space-12) var(--space-6);
          text-align: center;
          position: relative;
        }

        .hug-counter__content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-4);
          max-width: var(--max-width);
          margin: 0 auto;
        }

        .hug-counter__emoji {
          font-size: 2rem;
          opacity: 0.8;
        }

        .hug-counter__numbers {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--space-2);
        }

        .hug-counter__hugs,
        .hug-counter__countries {
          display: flex;
          align-items: baseline;
          gap: var(--space-2);
        }

        .hug-counter__number {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2.5rem, 6vw, 4rem);
          color: var(--punch-gold);
          line-height: 1;
          letter-spacing: -0.02em;
        }

        .hug-counter__label {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: var(--text-lg);
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.2;
        }

        /* Desktop layout */
        @media (min-width: 640px) {
          .hug-counter__numbers {
            flex-direction: row;
            align-items: center;
            justify-content: center;
            gap: var(--space-6);
          }

          .hug-counter__content {
            flex-direction: row;
            gap: var(--space-6);
          }

          .hug-counter__emoji {
            font-size: 2.5rem;
          }
        }

        /* Compact mobile variant */
        @media (max-width: 480px) {
          .hug-counter__number {
            font-size: clamp(2rem, 8vw, 2.5rem);
          }
          
          .hug-counter__label {
            font-size: var(--text-base);
          }

          .hug-counter {
            padding: var(--space-8) var(--space-4);
          }
        }

        /* Animation states */
        .hug-counter__number {
          transition: transform var(--duration-fast) var(--ease-default);
        }

        .hug-counter__number:hover {
          transform: scale(1.05);
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hug-counter__number:hover {
            transform: none;
          }
        }

        /* High contrast */
        @media (prefers-contrast: high) {
          .hug-counter {
            background: #000;
          }
          
          .hug-counter__number {
            color: #FFD700;
          }
          
          .hug-counter__label {
            color: #FFF;
          }
        }
      `}</style>
    </div>
  );
}