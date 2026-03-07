import React from 'react';
import { Link } from 'react-router-dom';
import Timeline from '../components/Timeline/Timeline';
import Button from '../components/ui/Button';

/**
 * Home page — the scrolling timeline of Punch's story with a footer
 * linking to the mood quiz. This is the main landing experience.
 */
export default function TimelinePage() {
  return (
    <>
      <Timeline />
      <footer className="site-footer">
        <div className="footer-inner">
          <p className="footer-tagline">#HangInTherePunch</p>
          <Link to="/mood" className="footer-mood-link">
            🐒 What Punch moment are you today?
          </Link>
          <p className="footer-credit">
            Made with love for Punch and anyone who's ever needed to hold something close.
          </p>
        </div>
      </footer>
      <style>{`
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
        .footer-mood-link {
          display: inline-block;
          padding: 0.75rem 1.5rem;
          background: var(--color-accent);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          transition: background 0.2s, transform 0.1s;
          align-self: center;
        }
        .footer-mood-link:hover {
          background: var(--color-accent-hover);
          color: white;
          transform: translateY(-2px);
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
