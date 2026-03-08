import React, { useState, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import './ConfessionCard.css';

/**
 * Individual confession card with me too interaction
 * Features organic visual variety and smooth animations
 */
export default function ConfessionCard({ confession, onMeToo, hasInteracted, style = {} }) {
  const [justTapped, setJustTapped] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const cardRef = useRef(null);
  
  // Scroll reveal animation
  const [revealRef, isVisible] = useScrollReveal({
    threshold: 0.2,
    rootMargin: '50px'
  });

  // Format relative time
  const formatTime = (timestamp) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(diff / (1000 * 60 * 60 * 24 * 7));

    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    if (weeks < 4) return `${weeks}w ago`;
    return 'a while ago';
  };

  // Handle me too interaction
  const handleMeToo = () => {
    if (hasInteracted) return;
    
    setJustTapped(true);
    onMeToo(confession.id);
    
    // Reset animation state
    setTimeout(() => setJustTapped(false), 400);
  };

  // Handle share (future feature)
  const handleShare = () => {
    setShowShare(!showShare);
    // TODO: Implement share card generation
  };

  // Combine refs for scroll reveal
  const combinedRef = (node) => {
    revealRef(node);
    cardRef.current = node;
  };

  return (
    <div
      ref={combinedRef}
      className={`confession-card ${isVisible ? 'confession-card--visible' : 'confession-card--entering'} ${confession.isNew ? 'confession-card--new' : ''}`}
      style={style}
      role="article"
      aria-label={`Confession: ${confession.text.substring(0, 50)}...`}
    >
      {/* Emoji */}
      <div className="confession-card__emoji" role="img" aria-label={confession.emoji}>
        {confession.emoji}
      </div>

      {/* Confession text */}
      <div className="confession-card__text">
        {confession.text}
      </div>

      {/* Divider */}
      <div className="confession-card__divider" aria-hidden="true"></div>

      {/* Actions row */}
      <div className="confession-card__actions">
        <button
          className={`metoo-btn ${hasInteracted ? 'metoo-btn--active' : ''} ${justTapped ? 'metoo-btn--just-tapped' : ''}`}
          onClick={handleMeToo}
          disabled={hasInteracted}
          aria-pressed={hasInteracted}
          aria-label={`Me too, ${confession.meTooCount} people agree`}
        >
          <span className="metoo-heart">
            {hasInteracted ? '❤️' : '♡'}
          </span>
          <span className="metoo-count">{confession.meTooCount}</span>
        </button>

        <time 
          className="confession-card__timestamp"
          dateTime={new Date(confession.createdAt).toISOString()}
          title={new Date(confession.createdAt).toLocaleString()}
        >
          {formatTime(confession.createdAt)}
        </time>
      </div>

      {/* Share button (desktop hover, mobile always visible) */}
      <button
        className="confession-card__share"
        onClick={handleShare}
        aria-label="Share this confession"
        title="Share this confession"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M8 1L15 8L8 15M15 8H1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>


    </div>
  );
}