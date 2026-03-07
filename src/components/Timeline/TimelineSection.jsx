import React, { useRef, useEffect, useState } from 'react';
import Signup from '../Signup/Signup';

export default function TimelineSection({ section, index, isLast }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(el);

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

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={sectionRef}
      className={`timeline-section ${isVisible ? 'visible' : ''} ${isEven ? 'even' : 'odd'}`}
      style={{ '--section-color': section.color, '--section-bg': section.bgColor }}
      id={`section-${section.id}`}
    >
      <div className="timeline-dot" style={{ borderColor: section.color }}>
        <span className="timeline-dot-emoji">{section.emoji}</span>
      </div>

      <div className="timeline-content">
        <div className="timeline-card">
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
              <span className="timeline-number">Chapter {section.number}</span>
              <span className="timeline-date">{section.date}</span>
            </div>
            <h2 className="timeline-title">{section.title}</h2>
            <p className="timeline-body">{section.content}</p>
            <p className="timeline-detail">{section.detail}</p>
          </div>

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
