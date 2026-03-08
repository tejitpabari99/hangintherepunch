import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './QuizFAB.css';

/**
 * Floating Action Button that links to the mood quiz (/mood).
 * Hidden while the hero section is visible — appears after scrolling past it.
 * Uses Intersection Observer on the hero ref passed from parent.
 *
 * @param {React.RefObject} heroRef - ref to the hero element for visibility tracking
 */
export default function QuizFAB({ heroRef }) {
  const [showFab, setShowFab] = useState(false);

  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowFab(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroRef]);

  return (
    <Link
      to="/mood"
      className={`quiz-fab ${showFab ? 'quiz-fab--visible' : ''}`}
      aria-label="Take the mood quiz: What Punch are you?"
    >
      🐒 I Am Punch
    </Link>
  );
}
