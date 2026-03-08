import React from 'react';
import { Link } from 'react-router-dom';
import ProgressTracker, { MilestoneNotifyCTA } from '../components/ProgressTracker/ProgressTracker';
import './ProgressPage.css';

/**
 * Standalone progress page at /progress.
 * Shows the full milestone tracker with a header and notify CTA.
 * The #1 retention feature — gives people a reason to come back.
 */
export default function ProgressPage() {
  return (
    <div className="progress-page">
      <nav className="progress-page__nav">
        <Link to="/">← Back to timeline</Link>
      </nav>

      <header className="progress-page__header">
        <h1 className="progress-page__title">
          Punch's Journey 🐒
        </h1>
        <p className="progress-page__subtitle">
          Every milestone on the road from abandoned baby to troop member.
        </p>
      </header>

      <ProgressTracker />
      <div className="progress-page__cta-wrapper">
        <MilestoneNotifyCTA />
      </div>

      <footer className="progress-page__footer">
        <Link to="/" className="progress-page__footer-link">
          ← Read Punch's full story
        </Link>
      </footer>
    </div>
  );
}
