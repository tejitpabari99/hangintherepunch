import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { downloadShareCard } from '../../utils/shareCard';
import Button from '../ui/Button';

/**
 * Displays the user's mood quiz result as a shareable card.
 * Supports sharing to X, copying the link, and downloading
 * the card as a PNG via html2canvas.
 */
export default function ResultCard({ result, onRestart }) {
  const cardRef = useRef(null);
  const [copied, setCopied] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const shareText = `I'm "${result.title}" today 🐒 What Punch moment are you? Find out at hangintherepunch.com/mood #HangInTherePunch`;

  const handleShare = () => {
    const url = `https://x.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText}\nhttps://hangintherepunch.com/mood`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail in insecure contexts — fallback to execCommand
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  /** Download card as PNG — delegates to shared utility */
  const handleDownload = () => {
    downloadShareCard(cardRef.current, `punch-moment-${result.id}`);
  };

  return (
    <div className="mood-result">
      {/* Capturable card — this div gets turned into a PNG */}
      <div className="mood-result-card" ref={cardRef} style={{ background: result.bgGradient }}>
        <div className="result-card-inner">
          <p className="result-label">Your Punch Moment</p>
          <div className="result-emoji">{result.emoji}</div>
          <h2 className="result-title">{result.title}</h2>
          <p className="result-description">{result.description}</p>
          <p className="result-advice">"{result.advice}"</p>
          <div className="result-meta">
            <span className="result-date">{today}</span>
            <span className="result-watermark">hangintherepunch.com</span>
          </div>
        </div>
      </div>

      <div className="mood-result-actions">
        <Button
          variant="primary"
          className="result-action result-action--share"
          onClick={handleShare}
        >
          Share on 𝕏
        </Button>
        <Button
          variant="secondary"
          className="result-action result-action--copy"
          onClick={handleCopy}
        >
          {copied ? '✓ Copied!' : 'Copy Link'}
        </Button>
        <Button
          variant="secondary"
          className="result-action result-action--download"
          onClick={handleDownload}
        >
          📷 Save Image
        </Button>
      </div>

      <div className="mood-result-footer">
        <button className="result-restart" onClick={onRestart}>
          Try Again
        </button>
        <Link to="/" className="result-story-link">
          Read Punch's Full Story →
        </Link>
      </div>
    </div>
  );
}
