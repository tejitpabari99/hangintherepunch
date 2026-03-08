import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { timelineSections, formatShortDate } from '../data/timelineData';
import './TimelineDetailPage.css';

/**
 * Expanded detail page for a single timeline section.
 * Route: /timeline/:id — each milestone becomes a shareable URL.
 * Shows rich body text, sources, and prev/next chapter navigation.
 */
export default function TimelineDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Find the current section and its neighbors for prev/next nav
  const currentIndex = timelineSections.findIndex((s) => s.id === id);
  const section = timelineSections[currentIndex];
  const prevSection = currentIndex > 0 ? timelineSections[currentIndex - 1] : null;
  const nextSection = currentIndex < timelineSections.length - 1 ? timelineSections[currentIndex + 1] : null;

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // 404 guard — if section doesn't exist, redirect to timeline
  if (!section) {
    return (
      <div className="detail-not-found">
        <p>Chapter not found.</p>
        <Link to="/">← Back to timeline</Link>
      </div>
    );
  }

  const detail = section.detailContent;

  return (
    <article className="detail-page">
      {/* Sticky back navigation */}
      <nav className="detail-back">
        <Link to="/">← Back to timeline</Link>
      </nav>

      {/* Hero image placeholder — uses section gradient */}
      <div
        className="detail-hero-image"
        style={{ background: section.placeholderGradient }}
      >
        <span className="detail-hero-emoji">{section.emoji}</span>
      </div>

      <div className="detail-container">
        {/* Date badge */}
        <p className="detail-date">{section.date}</p>

        {/* Title */}
        <h1 className="detail-title">{section.title}</h1>
        {section.subtitle && (
          <p className="detail-subtitle">{section.subtitle}</p>
        )}

        {/* Rich body content */}
        {detail?.bodyHtml ? (
          <div
            className="detail-body"
            dangerouslySetInnerHTML={{ __html: detail.bodyHtml }}
          />
        ) : (
          <div className="detail-body">
            <p>{section.content}</p>
            <p>{section.detail}</p>
          </div>
        )}

        {/* Source references — full list with complete dates */}
        {detail?.sources?.length > 0 && (
          <div className="detail-sources">
            <h2 className="detail-sources__title">Sources</h2>
            <ul className="detail-sources__list">
              {detail.sources.map((source, i) => (
                <li key={i} className="detail-sources__item">
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                  </a>
                  {source.date && (
                    <span className="detail-sources__date">
                      — {formatShortDate(source.date)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Prev/Next chapter navigation */}
        <nav className="detail-nav">
          <div>
            {prevSection && (
              <Link
                to={`/timeline/${prevSection.id}`}
                className="detail-nav__link detail-nav__link--prev"
              >
                ← {prevSection.title}
              </Link>
            )}
          </div>
          <div>
            {nextSection && (
              <Link
                to={`/timeline/${nextSection.id}`}
                className="detail-nav__link detail-nav__link--next"
              >
                {nextSection.title} →
              </Link>
            )}
          </div>
        </nav>
      </div>
    </article>
  );
}
