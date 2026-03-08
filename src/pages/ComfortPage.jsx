import React from 'react';
import Confessional from '../components/Confessional/Confessional';

/**
 * Hidden page for the comfort object confessional feature
 * Route: /comfort (not linked from nav)
 */
export default function ComfortPage() {
  return (
    <div className="comfort-page">
      <Confessional />
    </div>
  );
}