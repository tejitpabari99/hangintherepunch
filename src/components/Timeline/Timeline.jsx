import React from 'react';
import TimelineSection from './TimelineSection';
import { timelineSections } from '../../data/timelineData';
import './Timeline.css';

export default function Timeline() {
  return (
    <div className="timeline">
      <header className="timeline-hero">
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
        </div>
      </header>

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
}
