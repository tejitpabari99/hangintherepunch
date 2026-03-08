import React, { useState, useRef, useEffect } from 'react';
import './ConfessionForm.css';

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


    </div>
  );
}