import React, { useState } from 'react';
import './Signup.css';

export default function Signup({ variant = 'inline' }) {
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
      // Stub: POST to /api/signup (will connect to Resend later)
      console.log('📧 Email signup:', email);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // In production, this would be:
      // const res = await fetch('/api/signup', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email }),
      // });
      // if (!res.ok) throw new Error('Signup failed');

      setStatus('success');
    } catch (err) {
      setErrorMsg('Something went wrong. Try again?');
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className={`signup signup--${variant} signup--success`}>
        <div className="signup-success-emoji">🐒</div>
        <p className="signup-success-text">
          You're part of Punch's family now
        </p>
        <p className="signup-success-sub">
          We'll keep you posted on Punch's journey.
        </p>
      </div>
    );
  }

  return (
    <div className={`signup signup--${variant}`}>
      <h3 className="signup-title">Stay in Punch's Corner</h3>
      <p className="signup-subtitle">Never miss a Punch moment.</p>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="signup-input-group">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === 'error') setStatus('idle');
            }}
            placeholder="your@email.com"
            className={`signup-input ${status === 'error' ? 'signup-input--error' : ''}`}
            disabled={status === 'loading'}
            aria-label="Email address"
          />
          <button
            type="submit"
            className="signup-button"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="signup-spinner">⏳</span>
            ) : (
              'Join'
            )}
          </button>
        </div>
        {status === 'error' && (
          <p className="signup-error">{errorMsg}</p>
        )}
      </form>
      <p className="signup-fine-print">No spam. Just monkey updates. 🐵</p>
    </div>
  );
}
