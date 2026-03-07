import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-load pages — keeps the initial JS bundle small.
// Timeline is the heaviest page (data + scroll logic), mood quiz is secondary.
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const MoodPage = lazy(() => import('./pages/MoodPage'));

/**
 * Root app component — handles routing between the timeline and mood quiz.
 * /mood and /i-am-punch both resolve to the quiz (the latter is a friendlier URL for sharing).
 */
function App() {
  return (
    <Suspense
      fallback={
        <div className="loading-screen">
          <div className="loading-monkey">🐒</div>
          <p>Loading Punch's story...</p>
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<TimelinePage />} />
        <Route path="/mood" element={<MoodPage />} />
        <Route path="/i-am-punch" element={<MoodPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
