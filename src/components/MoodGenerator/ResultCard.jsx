import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

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
      // Fallback
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

  const handleDownload = async () => {
    try {
      const html2canvas = (await import('html2canvas')).default;
      const card = cardRef.current;
      if (!card) return;
      const canvas = await html2canvas(card, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `punch-moment-${result.id}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to generate image:', err);
    }
  };

  return (
    <div className="mood-result">
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
        <button className="result-action result-action--share" onClick={handleShare}>
          Share on 𝕏
        </button>
        <button className="result-action result-action--copy" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy Link'}
        </button>
        <button className="result-action result-action--download" onClick={handleDownload}>
          📷 Save Image
        </button>
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
