import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy-load pages — keeps the initial JS bundle small.
const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const MoodPage = lazy(() => import('./pages/MoodPage'));
const TimelineDetailPage = lazy(() => import('./pages/TimelineDetailPage'));
const ProgressPage = lazy(() => import('./pages/ProgressPage'));

// Hidden features (not linked from nav until approved)
const HugPage = lazy(() => import('./pages/HugPage'));
const ComfortPage = lazy(() => import('./pages/ComfortPage'));

/**
 * Root app component — handles routing.
 * /                    → main timeline
 * /mood, /i-am-punch   → mood quiz
 * /timeline/:id        → expanded detail page for a timeline section
 * /progress            → milestone tracker page
 * 
 * Hidden routes (not linked from nav):
 * /hug                 → global hug map
 * /comfort             → comfort object confessional
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
        <Route path="/timeline/:id" element={<TimelineDetailPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        
        {/* Hidden features - not linked from nav */}
        <Route path="/hug" element={<HugPage />} />
        <Route path="/comfort" element={<ComfortPage />} />
      </Routes>
    </Suspense>
  );
}

export default App;
