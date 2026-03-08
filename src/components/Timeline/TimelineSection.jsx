import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScrollReveal from '../../hooks/useScrollReveal';
import { formatShortDate } from '../../data/timelineData';

/**
 * Single timeline entry — card with image placeholder, text, sources, and click-through.
 * Cards link to /timeline/:id for expanded detail pages.
 * Sources render as expandable footnotes at the bottom of each card.
 */
export default function TimelineSection({ section, index, isLast }) {
  const [scrollRef, isVisible] = useScrollReveal();
  const parallaxRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sourcesOpen, setSourcesOpen] = useState(false);

  // Parallax: track scroll position relative to this section for the image float effect
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
  const hasDetailPage = !!section.detailContent;

  // Card inner content — shared between linked and non-linked versions
  const cardInner = (
    <>
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

        {/* Expandable source references — collapsed by default for clean cards */}
        {section.sources?.length > 0 && (
          <div className="card-sources-wrapper">
            <button
              className="card-sources-toggle"
              onClick={(e) => {
                e.preventDefault(); // Don't trigger card link
                e.stopPropagation();
                setSourcesOpen(!sourcesOpen);
              }}
              aria-expanded={sourcesOpen}
            >
              <span
                className={`card-sources-toggle__icon ${sourcesOpen ? 'card-sources-toggle__icon--open' : ''}`}
              >
                ▸
              </span>
              📰 {section.sources.length} source{section.sources.length > 1 ? 's' : ''}
            </button>
            {sourcesOpen && (
              <div className="card-sources-list">
                {section.sources.map((source, i) => (
                  <a
                    key={i}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-source"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {source.label}
                    {source.date && ` (${formatShortDate(source.date)})`}
                    <span className="card-source__icon">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Click-through hint — tells users cards are interactive */}
        {hasDetailPage && (
          <div className="card-expand-hint">
            Read the full story <span className="card-expand-hint__arrow">→</span>
          </div>
        )}
      </div>
    </>
  );

  return (
    <section
      ref={(node) => {
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
        {/* Wrap entire card in a Link for detail page navigation */}
        {hasDetailPage ? (
          <Link
            to={`/timeline/${section.id}`}
            className="timeline-card timeline-card--clickable"
          >
            {cardInner}
          </Link>
        ) : (
          <div className="timeline-card">
            {cardInner}
          </div>
        )}
      </div>
    </section>
  );
}
