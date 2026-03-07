import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const TimelinePage = lazy(() => import('./pages/TimelinePage'));
const MoodPage = lazy(() => import('./pages/MoodPage'));

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
