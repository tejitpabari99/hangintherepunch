import React, { useState, useRef } from 'react';
import html2canvas from 'html2canvas';

/**
 * Share card overlay shown after sending a hug
 * Allows sharing on social media or downloading the card
 */
export default function HugShareCard({ hugNumber, city, country, onClose }) {
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const cardRef = useRef(null);

  // Generate share URL
  const shareUrl = `${window.location.origin}/hug?id=${hugNumber}`;
  const shareText = `I'm hug #${hugNumber.toLocaleString()} for Punch 🐒❤️`;

  // Copy link to clipboard
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  // Share on X/Twitter
  const handleShareX = () => {
    const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(tweetUrl, '_blank');
  };

  // Generate and download image
  const handleSaveImage = async () => {
    if (!cardRef.current) return;

    setIsGeneratingImage(true);
    
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#2A2420',
        scale: 2, // Higher resolution
        width: 1080,
        height: 1080,
        useCORS: true,
        allowTaint: true
      });

      // Create download link
      const link = document.createElement('a');
      link.download = `punch-hug-${hugNumber}.png`;
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error generating image:', error);
    }

    setIsGeneratingImage(false);
  };

  // Native share API
  const handleMoreShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareText,
          text: `From ${city}, ${country}`,
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="hug-share-overlay" onClick={handleBackdropClick}>
      <div className="hug-share-sheet">
        {/* Drag handle for mobile */}
        <div className="hug-share-sheet__handle" aria-hidden="true"></div>
        
        {/* Share card preview */}
        <div className="hug-share-card-container">
          <div ref={cardRef} className="hug-share-card">
            <div className="hug-share-card__emoji">🐒❤️</div>
            <div className="hug-share-card__title">
              I'm hug #{hugNumber.toLocaleString()}
            </div>
            <div className="hug-share-card__subtitle">
              from {city}, {country}
            </div>
            <div className="hug-share-card__divider">── ✦ ──</div>
            <div className="hug-share-card__branding">
              hangintherepunch.com
            </div>
          </div>
        </div>

        {/* Share buttons */}
        <div className="hug-share-actions">
          <button 
            className="hug-share-btn"
            onClick={handleCopyLink}
            disabled={copySuccess}
          >
            <span className="hug-share-btn__icon">📋</span>
            {copySuccess ? 'Copied! ✓' : 'Copy Link'}
          </button>

          <button 
            className="hug-share-btn"
            onClick={handleShareX}
          >
            <span className="hug-share-btn__icon">𝕏</span>
            Share on X
          </button>

          <button 
            className="hug-share-btn"
            onClick={handleSaveImage}
            disabled={isGeneratingImage}
          >
            <span className="hug-share-btn__icon">📸</span>
            {isGeneratingImage ? 'Generating...' : 'Save Image'}
          </button>

          {navigator.share && (
            <button 
              className="hug-share-btn"
              onClick={handleMoreShare}
            >
              <span className="hug-share-btn__icon">📱</span>
              More...
            </button>
          )}
        </div>

        {/* Done button */}
        <button className="hug-share-done" onClick={onClose}>
          Done ✓
        </button>
      </div>

      <style jsx>{`
        .hug-share-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(42, 36, 32, 0.5);
          z-index: 2000;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          backdrop-filter: blur(4px);
        }

        .hug-share-sheet {
          background: white;
          border-radius: 20px 20px 0 0;
          padding: var(--space-8) var(--space-6) var(--space-6);
          width: 100%;
          max-width: 480px;
          max-height: 90vh;
          overflow-y: auto;
          animation: slideUp var(--duration-slow) var(--ease-enter);
        }

        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .hug-share-sheet__handle {
          width: 40px;
          height: 4px;
          background: rgba(61, 43, 31, 0.3);
          border-radius: 2px;
          margin: -var(--space-4) auto var(--space-6);
        }

        .hug-share-card-container {
          margin-bottom: var(--space-8);
        }

        .hug-share-card {
          background: #2A2420;
          border-radius: 16px;
          padding: var(--space-8);
          text-align: center;
          color: white;
          position: relative;
          overflow: hidden;
        }

        .hug-share-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(212, 160, 82, 0.08) 0%, transparent 70%);
          pointer-events: none;
        }

        .hug-share-card__emoji {
          font-size: 3rem;
          margin-bottom: var(--space-4);
        }

        .hug-share-card__title {
          font-family: var(--font-display);
          font-weight: 900;
          font-size: clamp(2rem, 5vw, 3rem);
          color: var(--punch-gold);
          line-height: 1.1;
          margin-bottom: var(--space-3);
          letter-spacing: -0.02em;
        }

        .hug-share-card__subtitle {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: var(--text-lg);
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: var(--space-6);
        }

        .hug-share-card__divider {
          color: rgba(212, 160, 82, 0.4);
          font-size: var(--text-base);
          margin-bottom: var(--space-6);
        }

        .hug-share-card__branding {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: var(--text-xs);
          color: rgba(255, 255, 255, 0.4);
        }

        .hug-share-actions {
          display: flex;
          flex-direction: column;
          gap: var(--space-3);
          margin-bottom: var(--space-6);
        }

        .hug-share-btn {
          display: flex;
          align-items: center;
          gap: var(--space-4);
          padding: 14px 16px;
          border-radius: 12px;
          background: var(--color-bg-deep);
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 400;
          color: var(--color-text);
          transition: background var(--duration-fast) var(--ease-default);
          min-height: 44px;
        }

        .hug-share-btn:hover:not(:disabled) {
          background: var(--color-accent-light);
        }

        .hug-share-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .hug-share-btn__icon {
          font-size: 1.2em;
          min-width: 24px;
          text-align: center;
        }

        .hug-share-done {
          width: 100%;
          padding: 16px;
          border-radius: 12px;
          background: var(--punch-gold);
          color: white;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 500;
          transition: background var(--duration-fast) var(--ease-default);
          min-height: 52px;
        }

        .hug-share-done:hover {
          background: var(--color-accent-hover);
        }

        /* Desktop modal */
        @media (min-width: 768px) {
          .hug-share-overlay {
            align-items: center;
          }

          .hug-share-sheet {
            border-radius: 20px;
            max-width: 480px;
            max-height: 80vh;
            animation: modalIn var(--duration-normal) var(--ease-enter);
          }

          @keyframes modalIn {
            from {
              transform: scale(0.95);
              opacity: 0;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }

          .hug-share-sheet__handle {
            display: none;
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .hug-share-sheet {
            animation: none;
          }
          
          .hug-share-overlay {
            backdrop-filter: none;
          }
        }
      `}</style>
    </div>
  );
}