import React, { useState } from 'react';
import { milestones } from '../../data/milestoneData';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ProgressTracker.css';

/**
 * Visual milestone board showing Punch's socialization journey.
 * Vertical timeline with completed/current/future states.
 * Current milestone pulses to draw attention. Future ones are grayed out.
 *
 * @param {boolean} compact - if true, renders a shorter inline version (for main page)
 */
export default function ProgressTracker({ compact = false }) {
  const completedCount = milestones.filter((m) => m.status === 'complete').length;
  const totalCount = milestones.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className={`progress-tracker ${compact ? 'progress-tracker--compact' : ''}`}>
      {/* Progress summary bar */}
      <div className="progress-bar-wrapper">
        <div className="progress-bar-label">
          <span className="progress-bar-count">
            {completedCount} of {totalCount} milestones reached
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-bar__fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Milestone list */}
      <div className="milestone-list">
        {milestones.map((milestone, index) => (
          <MilestoneItem
            key={milestone.id}
            milestone={milestone}
            index={index}
            isLast={index === milestones.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

/**
 * Individual milestone node — dot + content card on the vertical path.
 * Scroll-reveals with staggered timing for a cascading effect.
 */
function MilestoneItem({ milestone, index, isLast }) {
  const [ref, isVisible] = useScrollReveal({ threshold: 0.1 });

  const statusIcon = milestone.status === 'complete' ? '✅'
    : milestone.status === 'current' ? '⏳'
    : '⬜';

  return (
    <div
      ref={ref}
      className={`milestone milestone--${milestone.status} ${isVisible ? 'milestone--visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Connecting line between milestones */}
      {!isLast && (
        <div className={`milestone-connector milestone-connector--${milestone.status}`} />
      )}

      {/* Dot indicator */}
      <div className={`milestone-dot milestone-dot--${milestone.status}`}>
        <span className="milestone-dot__icon">{statusIcon}</span>
      </div>

      {/* Content card */}
      <div className="milestone-content">
        {milestone.status !== 'future' && milestone.dateLabel && (
          <span className="milestone-date">{milestone.dateLabel}</span>
        )}
        <h3 className="milestone-title">{milestone.title}</h3>
        <p className="milestone-description">{milestone.description}</p>
        {milestone.source && (
          <a
            href={milestone.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="milestone-source"
          >
            Source: {milestone.source.label} ↗
          </a>
        )}
      </div>
    </div>
  );
}

/**
 * Email CTA for milestone notifications — separate component to keep ProgressTracker clean.
 * Reuses the signup pattern but with milestone-specific copy.
 */
export function MilestoneNotifyCTA() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    try {
      await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'milestone' }),
      });
    } catch {
      // Stub backend
      console.log('Milestone notify signup:', email);
    }
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <div className="milestone-notify milestone-notify--success">
        <p>🐒 We'll let you know when Punch hits his next milestone!</p>
      </div>
    );
  }

  return (
    <div className="milestone-notify">
      <h3 className="milestone-notify__title">
        Get notified when Punch reaches his next milestone
      </h3>
      <form className="milestone-notify__form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="milestone-notify__input"
          aria-label="Email for milestone notifications"
        />
        <button type="submit" className="milestone-notify__btn">
          Notify Me 🐵
        </button>
      </form>
    </div>
  );
}
