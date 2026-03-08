import React from 'react';
import HugMap from '../components/HugMap/HugMap';

/**
 * Hidden page for the hug map feature
 * Route: /hug (not linked from nav)
 */
export default function HugPage() {
  return (
    <div className="hug-page">
      <HugMap />
    </div>
  );
}