import React, { useState } from 'react';
import './SignupSection.css';

/**
 * Standalone signup interstitial — lives between the timeline and footer.
 * Visually distinct from timeline cards: full-width gold gradient background,
 * prominent CTA, stacked on mobile → inline on desktop.
 * Keeps the existing stub backend (console.log + success state until real API).
 */
export default function SignupSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setErrorMsg('Please enter a valid email');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error('Signup failed');
      setStatus('success');
    } catch (err) {
      // Stub: treat as success since backend isn't live yet
      console.log('Signup submitted:', email);
      setStatus('success');
    }
  };

  // Success state replaces the form with a warm confirmation
  if (status === 'success') {
    return (
      <section className="signup-section">
        <div className="signup-section__inner">
          <div className="signup-section__success-emoji">🐒</div>
          <h2 className="signup-section__headline">You're in!</h2>
          <p className="signup-section__subhead">
            Check your inbox. We'll keep you posted on Punch's journey.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="signup-section">
      <div className="signup-section__inner">
        <h2 className="signup-section__headline">Stay in Punch's Corner</h2>
        <p className="signup-section__subhead">
          Get milestone updates, new stories, and the occasional monkey emoji.
        </p>
        <form className="signup-form-section" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="your@email.com"
            className={`signup-form-section__input ${status === 'error' ? 'signup-form-section__input--error' : ''}`}
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="signup-form-section__btn"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Signing up...' : 'Sign Up 🐵'}
          </button>
        </form>
        {status === 'error' && (
          <p className="signup-section__error">{errorMsg}</p>
        )}
        <p className="signup-section__proof">
          Join 847 others following Punch's journey
        </p>
        <p className="signup-section__fine-print">
          No spam. Just monkey updates. 🐵
        </p>
      </div>
    </section>
  );
}
