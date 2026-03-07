import React from 'react';
import MoodGenerator from '../components/MoodGenerator/MoodGenerator';

/**
 * Mood quiz page — thin wrapper around MoodGenerator.
 * Accessible via /mood and /i-am-punch routes.
 */
export default function MoodPage() {
  return <MoodGenerator />;
}
