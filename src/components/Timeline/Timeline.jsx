import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import TimelineSection from './TimelineSection';
import { timelineSections } from '../../data/timelineData';
import './Timeline.css';

/**
 * Full-page scrolling timeline of Punch's story.
 * Hero section at top, then a vertical track of TimelineSection cards.
 * forwardRef exposes the hero element so parent can track visibility for the FAB.
 */
const Timeline = forwardRef(function Timeline(props, heroRef) {
  return (
    <div className="timeline">
      {/* Full-viewport hero — sets the emotional tone before scrolling begins */}
      <header className="timeline-hero" ref={heroRef}>
        <div className="timeline-hero-inner">
          <div className="hero-emoji">🐒</div>
          <h1 className="hero-title">
            Hang In There,<br />
            <span className="hero-name">Punch</span>
          </h1>
          <p className="hero-subtitle">
            The story of the world's bravest monkey
          </p>
          <div className="hero-scroll-hint">
            <span>Scroll to begin</span>
            <div className="scroll-arrow">↓</div>
          </div>
          {/* Secondary quiz CTA — subtle, below the scroll hint */}
          <Link to="/mood" className="hero-quiz-link">
            <span className="hero-quiz-link__prefix">or</span>
            Take the Quiz →
          </Link>
        </div>
      </header>

      {/* Timeline spine — the vertical line and alternating cards */}
      <div className="timeline-track">
        <div className="timeline-line" aria-hidden="true" />
        {timelineSections.map((section, index) => (
          <TimelineSection
            key={section.id}
            section={section}
            index={index}
            isLast={index === timelineSections.length - 1}
          />
        ))}
      </div>
    </div>
  );
});

export default Timeline;
