import React, { useRef, useEffect, useState } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import Signup from '../Signup/Signup';

/**
 * Single timeline entry — card with image placeholder, text, and optional CTA.
 * Uses useScrollReveal for the fade-in trigger, plus a manual scroll listener
 * for the parallax effect on the image placeholder.
 */
export default function TimelineSection({ section, index, isLast }) {
  const [scrollRef, isVisible] = useScrollReveal();
  const parallaxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Parallax: track scroll position relative to this section for the image float effect.
  // This needs per-frame updates so it stays as a raw scroll listener.
  useEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1,
        (windowHeight - rect.top) / (windowHeight + rect.height)
      ));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={(node) => {
        // Attach both refs: scroll-reveal observer and parallax measurement
        scrollRef.current = node;
        parallaxRef.current = node;
      }}
      className={`timeline-section ${isVisible ? 'visible' : ''} ${isEven ? 'even' : 'odd'}`}
      style={{ '--section-color': section.color || section.sectionColor, '--section-bg': section.bgColor }}
      id={`section-${section.id}`}
    >
      {/* Dot on the timeline spine */}
      <div className="timeline-dot" style={{ borderColor: section.color || section.sectionColor }}>
        <span className="timeline-dot-emoji">{section.emoji}</span>
      </div>

      <div className="timeline-content">
        <div className="timeline-card">
          {/* Gradient placeholder — will be replaced with real images later */}
          <div
            className="timeline-image-placeholder"
            style={{
              background: section.placeholderGradient,
              transform: `translateY(${(1 - scrollProgress) * 20}px)`,
            }}
          >
            <span className="placeholder-emoji">{section.emoji}</span>
            <span className="placeholder-text">{section.imageAlt}</span>
          </div>

          <div className="timeline-text">
            <div className="timeline-meta">
              <span className="timeline-number">Chapter {section.number || index + 1}</span>
              <span className="timeline-date">{section.date}</span>
            </div>
            <h2 className="timeline-title">{section.title}</h2>
            <p className="timeline-body">{section.content}</p>
            <p className="timeline-detail">{section.detail}</p>
          </div>

          {/* Email signup CTA — only on the final "today" section */}
          {section.isCTA && (
            <div className="timeline-cta">
              <Signup />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
