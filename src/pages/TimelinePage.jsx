import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Timeline from '../components/Timeline/Timeline';
import SignupSection from '../components/SignupSection/SignupSection';
import QuizFAB from '../components/QuizFAB/QuizFAB';

/**
 * Home page — the scrolling timeline of Punch's story.
 * SignupSection is a full-width interstitial after the timeline (not inside it).
 * QuizFAB floats in the bottom-right after scrolling past the hero.
 */
export default function TimelinePage() {
  // heroRef tracks the hero section for FAB visibility
  const heroRef = useRef(null);

  return (
    <>
      <Timeline ref={heroRef} />

      {/* Progress tracker link — bridges timeline to the milestone page */}
      <div className="progress-link-section">
        <Link to="/progress" className="progress-link-cta">
          📊 Track Punch's Progress →
        </Link>
      </div>

      {/* Standalone signup — visually separate from the timeline */}
      <SignupSection />

      {/* Quiz FAB — appears after scrolling past hero */}
      <QuizFAB heroRef={heroRef} />

      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-tagline">#HangInTherePunch</p>
          <div className="footer-links">
            <Link to="/mood" className="footer-mood-link">
              🐒 What Punch moment are you today?
            </Link>
            <Link to="/progress" className="footer-progress-link">
              📊 Punch's Progress
            </Link>
          </div>
          <p className="footer-credit">
            Made with love for Punch and anyone who's ever needed to hold something close.
          </p>
        </div>
      </footer>

      <style>{`
        .progress-link-section {
          text-align: center;
          padding: var(--space-12) var(--space-6);
        }
        .progress-link-cta {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: 12px 28px;
          border-radius: 9999px;
          background: transparent;
          border: 1.5px solid var(--deep-bark);
          color: var(--deep-bark);
          font-family: var(--font-body);
          font-weight: 500;
          font-size: var(--text-base);
          text-decoration: none;
          transition: background var(--duration-fast) var(--ease-default),
                      color var(--duration-fast) var(--ease-default),
                      transform 0.1s var(--ease-default);
          min-height: 48px;
        }
        .progress-link-cta:hover {
          background: var(--deep-bark);
          color: white;
          transform: translateY(-1px);
        }
        .progress-link-cta:active {
          transform: translateY(0);
        }
        .site-footer {
          background: var(--color-bg-dark);
          padding: var(--space-2xl) var(--space-lg);
          text-align: center;
        }
        .footer-inner {
          max-width: var(--max-width);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: var(--space-md);
        }
        .footer-tagline {
          font-family: var(--font-display);
          font-size: 1.5rem;
          color: var(--color-accent);
        }
        .footer-links {
          display: flex;
          flex-direction: column;
          gap: var(--space-sm);
          align-items: center;
        }
        .footer-mood-link,
        .footer-progress-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--color-accent);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          transition: background 0.2s, transform 0.1s;
          text-decoration: none;
        }
        .footer-mood-link:hover,
        .footer-progress-link:hover {
          background: var(--color-accent-hover);
          color: white;
          transform: translateY(-2px);
        }
        .footer-progress-link {
          background: transparent;
          border: 1.5px solid var(--color-accent);
          color: var(--color-accent);
        }
        .footer-progress-link:hover {
          background: var(--color-accent);
          color: white;
        }
        .footer-credit {
          font-size: 0.8rem;
          color: var(--color-text-muted);
          max-width: 400px;
          margin: 0 auto;
          line-height: 1.6;
        }
      `}</style>
    </>
  );
}
