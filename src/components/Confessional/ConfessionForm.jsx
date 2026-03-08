import React, { useState, useRef, useEffect } from 'react';

/**
 * Confession submission form with emoji picker and character counter
 * Features rate limiting and success feedback
 */
export default function ConfessionForm({ onSubmit }) {
  const [text, setText] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🧸');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState('');
  const [canSubmit, setCanSubmit] = useState(true);

  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Check rate limiting
  useEffect(() => {
    const lastSubmission = localStorage.getItem('last-confession-time');
    const oneHourAgo = Date.now() - (60 * 60 * 1000);
    
    if (lastSubmission && parseInt(lastSubmission) > oneHourAgo) {
      setCanSubmit(false);
      const nextAllowed = parseInt(lastSubmission) + (60 * 60 * 1000);
      const minutesLeft = Math.ceil((nextAllowed - Date.now()) / (60 * 1000));
      setShowError(`One confession per hour — ${minutesLeft} minutes left`);
    }
  }, []);

  // Rotating placeholder examples
  const placeholders = [
    "My old teddy bear that's missing an eye...",
    "A song that always makes me feel safe...",
    "The ratty blanket I refuse to throw away...",
    "That one hoodie that still smells like home...",
    "A book I've read a hundred times...",
    "My morning coffee ritual..."
  ];

  const [placeholder, setPlaceholder] = useState(
    placeholders[Math.floor(Math.random() * placeholders.length)]
  );

  // Curated emoji options
  const emojiOptions = [
    '🧸', '🛏️', '🎵', '🐕', '🎮', '📖', '☕', '🧣', '🌙', '💊',
    '🎧', '🍫', '🐈', '🧶', '🏠', '🌊', '🎨', '🪴', '🍵', '🫂'
  ];

  // Handle text change
  const handleTextChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= 280) {
      setText(newText);
    }
  };

  // Handle emoji selection
  const handleEmojiSelect = (emoji) => {
    setSelectedEmoji(emoji);
    setShowEmojiPicker(false);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!canSubmit || isSubmitting || !text.trim()) return;

    setIsSubmitting(true);
    setShowError('');

    try {
      // Basic content filter (very simple)
      const bannedWords = ['http', 'www.', '.com', '.org'];
      const hasUrl = bannedWords.some(word => text.toLowerCase().includes(word));
      
      if (hasUrl) {
        throw new Error('No links allowed in confessions');
      }

      // Submit confession
      await onSubmit({
        text: text.trim(),
        emoji: selectedEmoji
      });

      // Success feedback
      setText('');
      setShowSuccess(true);
      localStorage.setItem('last-confession-time', Date.now().toString());
      setCanSubmit(false);
      
      // Hide success message
      setTimeout(() => setShowSuccess(false), 4000);
      
      // Update rate limit display
      setShowError('One confession per hour — thanks for sharing! 🐒');
      
    } catch (error) {
      setShowError(error.message || 'Something went wrong. Please try again.');
    }

    setIsSubmitting(false);
  };

  // Close emoji picker on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    if (showEmojiPicker) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showEmojiPicker]);

  // Character count color
  const getCharCountColor = () => {
    if (text.length > 260) return 'var(--color-rose)';
    if (text.length > 240) return 'var(--punch-gold)';
    return 'var(--soft-earth)';
  };

  return (
    <div className="confession-form-wrapper">
      <form className="confession-form" onSubmit={handleSubmit}>
        {/* Textarea */}
        <div className="confession-form__input-group">
          <label htmlFor="confession-text" className="sr-only">
            Share your comfort object
          </label>
          <textarea
            id="confession-text"
            ref={textareaRef}
            className="confession-input"
            value={text}
            onChange={handleTextChange}
            placeholder={placeholder}
            maxLength={280}
            disabled={isSubmitting}
            rows={3}
            style={{ resize: 'vertical' }}
          />
        </div>

        {/* Controls row */}
        <div className="confession-form__controls">
          <div className="confession-form__left">
            {/* Emoji picker */}
            <div className="emoji-picker-wrapper" ref={emojiPickerRef}>
              <button
                type="button"
                className="emoji-trigger"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                aria-label="Choose emoji"
                aria-expanded={showEmojiPicker}
                disabled={isSubmitting}
              >
                <span className="emoji-trigger__emoji">{selectedEmoji}</span>
                <span className="emoji-trigger__arrow">▾</span>
              </button>

              {showEmojiPicker && (
                <div className="emoji-picker">
                  <div className="emoji-picker__grid">
                    {emojiOptions.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        className={`emoji-option ${selectedEmoji === emoji ? 'emoji-option--selected' : ''}`}
                        onClick={() => handleEmojiSelect(emoji)}
                        aria-label={`Select ${emoji} emoji`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    className="emoji-picker__other"
                    onClick={() => {
                      const customEmoji = prompt('Enter any emoji:');
                      if (customEmoji) {
                        handleEmojiSelect(customEmoji.charAt(0));
                      }
                    }}
                  >
                    Other...
                  </button>
                </div>
              )}
            </div>

            {/* Character counter */}
            <span 
              className="char-counter"
              style={{ color: getCharCountColor() }}
              aria-live="polite"
            >
              {text.length}/280
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="confession-submit"
            disabled={!canSubmit || isSubmitting || !text.trim()}
          >
            {isSubmitting ? 'Confessing...' : 'Confess 🤫'}
          </button>
        </div>
      </form>

      {/* Success message */}
      {showSuccess && (
        <div className="confession-feedback confession-feedback--success">
          Your confession has been added 🐒
        </div>
      )}

      {/* Error message */}
      {showError && (
        <div className="confession-feedback confession-feedback--error">
          {showError}
        </div>
      )}

      <style jsx>{`
        .confession-form-wrapper {
          max-width: 560px;
          margin: 0 auto var(--space-12);
          position: relative;
        }

        .confession-form {
          display: flex;
          flex-direction: column;
          gap: var(--space-4);
        }

        /* Input group */
        .confession-form__input-group {
          position: relative;
        }

        .confession-input {
          width: 100%;
          min-height: 80px;
          max-height: 160px;
          resize: vertical;
          padding: var(--space-4);
          border: 1.5px solid #D4CCC4;
          border-radius: 16px;
          font-family: var(--font-body);
          font-size: 16px; /* Prevents iOS zoom */
          font-weight: 400;
          line-height: 1.5;
          color: var(--deep-bark);
          background: white;
          transition: 
            border-color var(--duration-fast) var(--ease-default),
            box-shadow var(--duration-fast) var(--ease-default);
          outline: none;
        }

        .confession-input:focus {
          border-color: var(--punch-gold);
          box-shadow: 0 0 0 3px rgba(212, 160, 82, 0.2);
        }

        .confession-input::placeholder {
          color: var(--soft-earth);
          font-weight: 300;
        }

        .confession-input:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        /* Controls row */
        .confession-form__controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-4);
        }

        .confession-form__left {
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        /* Emoji picker */
        .emoji-picker-wrapper {
          position: relative;
        }

        .emoji-trigger {
          display: flex;
          align-items: center;
          gap: var(--space-1);
          padding: 8px 12px;
          border-radius: 8px;
          background: white;
          border: 1px solid #D4CCC4;
          cursor: pointer;
          transition: all var(--duration-fast) var(--ease-default);
          min-height: 36px;
          font-size: var(--text-base);
        }

        .emoji-trigger:hover:not(:disabled) {
          border-color: var(--punch-gold);
          background: var(--color-bg);
        }

        .emoji-trigger:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .emoji-trigger__emoji {
          font-size: 1.2em;
        }

        .emoji-trigger__arrow {
          font-size: 0.8em;
          color: var(--soft-earth);
          transition: transform var(--duration-fast) var(--ease-default);
        }

        .emoji-trigger[aria-expanded="true"] .emoji-trigger__arrow {
          transform: rotate(180deg);
        }

        .emoji-picker {
          position: absolute;
          top: 100%;
          left: 0;
          z-index: 100;
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 24px rgba(61, 43, 31, 0.15);
          padding: var(--space-3);
          margin-top: var(--space-1);
          min-width: 240px;
          animation: emojiPickerIn var(--duration-fast) var(--ease-enter);
        }

        @keyframes emojiPickerIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-8px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .emoji-picker__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: var(--space-1);
          margin-bottom: var(--space-3);
        }

        .emoji-option {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1.2em;
          transition: background var(--duration-fast) var(--ease-default);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .emoji-option:hover {
          background: var(--color-bg-deep);
        }

        .emoji-option--selected {
          background: var(--color-accent-light);
        }

        .emoji-picker__other {
          width: 100%;
          padding: 6px 12px;
          border: 1px solid #D4CCC4;
          border-radius: 8px;
          background: white;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          color: var(--soft-earth);
          transition: all var(--duration-fast) var(--ease-default);
        }

        .emoji-picker__other:hover {
          border-color: var(--punch-gold);
          background: var(--color-bg);
        }

        /* Character counter */
        .char-counter {
          font-family: var(--font-mono);
          font-size: var(--text-xs);
          font-weight: 400;
          transition: color var(--duration-fast) var(--ease-default);
        }

        /* Submit button */
        .confession-submit {
          padding: 14px 32px;
          border-radius: 9999px;
          background: var(--punch-gold);
          color: white;
          border: none;
          cursor: pointer;
          font-family: var(--font-body);
          font-size: var(--text-base);
          font-weight: 500;
          transition: all var(--duration-fast) var(--ease-default);
          min-height: 44px;
          white-space: nowrap;
        }

        .confession-submit:hover:not(:disabled) {
          background: var(--color-accent-hover);
          transform: scale(1.02);
        }

        .confession-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Feedback messages */
        .confession-feedback {
          margin-top: var(--space-4);
          padding: var(--space-3) var(--space-4);
          border-radius: 12px;
          font-family: var(--font-body);
          font-size: var(--text-sm);
          font-weight: 400;
          animation: feedbackIn var(--duration-normal) var(--ease-enter);
        }

        @keyframes feedbackIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .confession-feedback--success {
          background: rgba(212, 160, 82, 0.1);
          border-left: 3px solid var(--punch-gold);
          color: var(--deep-bark);
        }

        .confession-feedback--error {
          background: rgba(200, 90, 84, 0.1);
          border-left: 3px solid var(--color-rose);
          color: var(--deep-bark);
        }

        /* Mobile responsive */
        @media (max-width: 639px) {
          .confession-form-wrapper {
            margin-bottom: var(--space-8);
          }

          .confession-form__controls {
            flex-wrap: wrap;
            gap: var(--space-3);
          }

          .confession-submit {
            width: 100%;
          }

          .emoji-picker {
            min-width: 200px;
          }

          .emoji-picker__grid {
            grid-template-columns: repeat(4, 1fr);
          }
        }

        /* Mobile bottom sheet for emoji picker */
        @media (max-width: 480px) {
          .emoji-picker {
            position: fixed;
            top: auto;
            bottom: 0;
            left: 0;
            right: 0;
            border-radius: 20px 20px 0 0;
            min-width: auto;
            max-height: 50vh;
            overflow-y: auto;
            animation: bottomSheetIn var(--duration-normal) var(--ease-enter);
          }

          @keyframes bottomSheetIn {
            from {
              opacity: 0;
              transform: translateY(100%);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .emojiPickerIn,
          .feedbackIn,
          .bottomSheetIn {
            animation: none !important;
          }
          
          .emoji-trigger__arrow {
            transition: none;
          }
        }

        /* High contrast */
        @media (prefers-contrast: high) {
          .confession-input,
          .emoji-trigger,
          .emoji-picker__other {
            border-color: #000;
          }
          
          .confession-input:focus {
            border-color: #000;
            box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.2);
          }
          
          .emoji-picker {
            border: 2px solid #000;
          }
        }
      `}</style>
    </div>
  );
}