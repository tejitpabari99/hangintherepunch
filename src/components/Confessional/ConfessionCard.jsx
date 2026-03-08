import React, { useState, useRef } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

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

      <style jsx>{`
        .confession-card {
          break-inside: avoid;
          margin-bottom: var(--space-4);
          padding: var(--space-6);
          background: white;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(61, 43, 31, 0.08);
          transition: 
            box-shadow var(--duration-normal) var(--ease-default),
            transform var(--duration-normal) var(--ease-default),
            opacity var(--duration-scroll) var(--ease-enter);
          position: relative;
          overflow: hidden;
        }

        /* Organic variety - subtle rotation and background variations */
        .confession-card:nth-child(3n) { transform: rotate(0.3deg); }
        .confession-card:nth-child(3n+1) { transform: rotate(-0.2deg); }
        .confession-card:nth-child(3n+2) { transform: rotate(0.15deg); }

        .confession-card:nth-child(4n) { background: #FFFEF9; }
        .confession-card:nth-child(4n+1) { background: #FFFFFF; }
        .confession-card:nth-child(4n+2) { background: #FEFCF7; }
        .confession-card:nth-child(4n+3) { background: #FFFEFC; }

        /* Hover effects (desktop only) */
        @media (hover: hover) {
          .confession-card:hover {
            box-shadow: 0 8px 24px rgba(61, 43, 31, 0.12);
            transform: translateY(-2px) rotate(0deg);
          }

          .confession-card__share {
            opacity: 0;
            transition: opacity var(--duration-fast) var(--ease-default);
          }

          .confession-card:hover .confession-card__share {
            opacity: 0.6;
          }

          .confession-card__share:hover {
            opacity: 1 !important;
          }
        }

        /* New card highlight */
        .confession-card--new {
          box-shadow: 0 0 0 2px rgba(212, 160, 82, 0.3), 0 1px 3px rgba(61, 43, 31, 0.08);
          animation: newCardFade 3s ease-out forwards;
        }

        @keyframes newCardFade {
          0% { box-shadow: 0 0 0 2px rgba(212, 160, 82, 0.3), 0 1px 3px rgba(61, 43, 31, 0.08); }
          100% { box-shadow: 0 1px 3px rgba(61, 43, 31, 0.08); }
        }

        /* Scroll reveal states */
        .confession-card--entering {
          opacity: 0;
          transform: translateY(16px) rotate(0deg);
        }

        .confession-card--visible {
          opacity: 1;
        }

        .confession-card--visible:nth-child(3n) { 
          transform: translateY(0) rotate(0.3deg); 
        }
        .confession-card--visible:nth-child(3n+1) { 
          transform: translateY(0) rotate(-0.2deg); 
        }
        .confession-card--visible:nth-child(3n+2) { 
          transform: translateY(0) rotate(0.15deg); 
        }

        /* Emoji */
        .confession-card__emoji {
          text-align: center;
          font-size: 2rem;
          margin-bottom: var(--space-3);
          line-height: 1;
        }

        /* Confession text */
        .confession-card__text {
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 400;
          line-height: 1.6;
          color: var(--deep-bark);
          margin-bottom: var(--space-4);
          word-wrap: break-word;
        }

        /* Divider */
        .confession-card__divider {
          height: 1px;
          background: rgba(61, 43, 31, 0.06);
          margin-bottom: var(--space-3);
        }

        /* Actions row */
        .confession-card__actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        /* Me too button */
        .metoo-btn {
          display: inline-flex;
          align-items: center;
          gap: var(--space-2);
          padding: 6px 14px;
          border-radius: 9999px;
          background: transparent;
          border: 1.5px solid rgba(61, 43, 31, 0.1);
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          color: var(--soft-earth);
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-default);
          min-height: 36px;
          min-width: 44px;
        }

        .metoo-btn:hover:not(:disabled) {
          border-color: var(--blush-pink);
          color: var(--blush-pink);
          background: rgba(232, 196, 184, 0.1);
        }

        .metoo-btn--active {
          border-color: var(--blush-pink);
          color: var(--blush-pink);
          background: rgba(232, 196, 184, 0.15);
          font-weight: 500;
          cursor: default;
        }

        .metoo-btn:disabled {
          cursor: default;
        }

        /* Heart animation */
        .metoo-heart {
          transition: transform var(--duration-fast) var(--ease-default);
        }

        .metoo-btn--just-tapped .metoo-heart {
          animation: heartBounce 400ms var(--ease-default);
          color: var(--blush-pink);
        }

        @keyframes heartBounce {
          0% { transform: scale(1); }
          30% { transform: scale(1.3); }
          60% { transform: scale(0.9); }
          100% { transform: scale(1); }
        }

        /* Count animation */
        .metoo-count {
          transition: transform var(--duration-fast) var(--ease-default);
          min-width: 1em;
          text-align: center;
        }

        .metoo-btn--just-tapped .metoo-count {
          animation: countBounce 200ms var(--ease-default);
        }

        @keyframes countBounce {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }

        /* Timestamp */
        .confession-card__timestamp {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          color: var(--soft-earth);
          font-weight: 400;
        }

        /* Share button */
        .confession-card__share {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: var(--soft-earth);
          opacity: 0.3;
          transition: 
            opacity var(--duration-fast) var(--ease-default),
            background var(--duration-fast) var(--ease-default);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .confession-card__share:hover {
          background: rgba(61, 43, 31, 0.05);
          opacity: 1;
        }

        /* Mobile adjustments */
        @media (max-width: 639px) {
          .confession-card {
            margin-bottom: var(--space-3);
            padding: var(--space-4);
          }

          .confession-card__share {
            opacity: 0.3; /* Always visible on mobile */
          }
        }

        /* Watermark (for screenshots) */
        .confession-card::after {
          content: 'hangintherepunch.com';
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-family: var(--font-body);
          font-size: 9px;
          font-weight: 300;
          color: rgba(61, 43, 31, 0.08);
          letter-spacing: 0.05em;
          pointer-events: none;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .confession-card {
            transform: none !important;
            transition-duration: 0.01ms !important;
          }
          
          .confession-card:hover {
            transform: none !important;
          }
          
          .confession-card--entering {
            opacity: 1;
            transform: none;
          }
          
          .heartBounce,
          .countBounce,
          .newCardFade {
            animation: none !important;
          }
        }

        /* High contrast */
        @media (prefers-contrast: high) {
          .confession-card {
            border: 2px solid #000;
            background: #FFF !important;
          }
          
          .metoo-btn {
            border-color: #000;
          }
          
          .metoo-btn--active {
            background: #000;
            color: #FFF;
          }
        }
      `}</style>
    </div>
  );
}