/**
 * Mood quiz data — questions, possible results, and scoring logic.
 * Each question has 4 options that map to weighted scores across 6 result archetypes.
 * The archetype with the highest total score wins.
 */

export const questions = [
  {
    id: 'day',
    question: "How's your day going?",
    options: [
      { label: 'Great', value: 'great', emoji: '✨' },
      { label: 'Meh', value: 'meh', emoji: '😐' },
      { label: 'Rough', value: 'rough', emoji: '😔' },
      { label: "Don't ask", value: 'terrible', emoji: '🫠' },
    ],
  },
  {
    id: 'need',
    question: 'Right now I need...',
    options: [
      { label: 'A hug', value: 'hug', emoji: '🤗' },
      { label: 'Space', value: 'space', emoji: '🌙' },
      { label: 'A friend', value: 'friend', emoji: '👋' },
      { label: 'Snacks', value: 'snacks', emoji: '🍌' },
    ],
  },
  {
    id: 'cope',
    question: 'When things get hard, I...',
    options: [
      { label: 'Hide', value: 'hide', emoji: '🫣' },
      { label: 'Hold something close', value: 'hold', emoji: '🧸' },
      { label: 'Reach out', value: 'reach', emoji: '🤝' },
      { label: 'Pretend I\'m fine', value: 'pretend', emoji: '🎭' },
    ],
  },
  {
    id: 'feel',
    question: 'Today I feel like...',
    options: [
      { label: 'Conquering the world', value: 'conquer', emoji: '🦁' },
      { label: 'Surviving', value: 'survive', emoji: '🏃' },
      { label: 'Hiding', value: 'hiding', emoji: '🕳️' },
      { label: 'Starting fresh', value: 'fresh', emoji: '🌱' },
    ],
  },
  {
    id: 'energy',
    question: 'My energy level is...',
    options: [
      { label: 'On fire', value: 'fire', emoji: '🔥' },
      { label: 'Good vibes', value: 'good', emoji: '😊' },
      { label: 'Sleepy', value: 'sleepy', emoji: '😴' },
      { label: 'Dead', value: 'dead', emoji: '💀' },
    ],
  },
];

export const results = {
  'cinder-block': {
    id: 'cinder-block',
    title: 'Hiding in the Cinder Block',
    emoji: '🧱',
    description: "Some days you just need a safe space to hide and hold your stuffed animal. That's not weakness — it's self-preservation. Punch gets it.",
    advice: "Take your time. The world can wait.",
    color: '#8B5E3C',
    bgGradient: 'linear-gradient(135deg, #D4C4B0 0%, #8B5E3C 100%)',
  },
  'oran-mama': {
    id: 'oran-mama',
    title: 'Clinging to Oran-Mama',
    emoji: '🧸',
    description: "You need comfort right now, and that's beautiful. Punch taught the world that holding onto something soft when everything feels hard is the bravest thing you can do.",
    advice: "Hold onto what makes you feel safe.",
    color: '#E8A84C',
    bgGradient: 'linear-gradient(135deg, #F0C78E 0%, #E8A84C 100%)',
  },
  'new-friend': {
    id: 'new-friend',
    title: 'Making a New Friend',
    emoji: '🤝',
    description: "You're in that beautiful space between comfort and courage. Like Punch stepping out of the cinder block and finding someone who gets it.",
    advice: "Keep your heart open. Good things are coming.",
    color: '#7BA07B',
    bgGradient: 'linear-gradient(135deg, #C8E0C0 0%, #7BA07B 100%)',
  },
  'monkey-mountain': {
    id: 'monkey-mountain',
    title: 'Exploring Monkey Mountain',
    emoji: '🏔️',
    description: "You're feeling brave today — ready to take on the mountain, meet new faces, and see what's out there. Punch would be proud.",
    advice: "Go explore. The mountain is yours.",
    color: '#7BA07B',
    bgGradient: 'linear-gradient(135deg, #B8D4B8 0%, #4A8B4A 100%)',
  },
  'sleeping-plushie': {
    id: 'sleeping-plushie',
    title: 'Sleeping with the Plushie',
    emoji: '😴',
    description: "You're tired and that's okay. Even Punch needs his rest. Curl up, hold something soft, and recharge. Tomorrow is a new day on Monkey Mountain.",
    advice: "Rest is not lazy. It's necessary.",
    color: '#9B7DB8',
    bgGradient: 'linear-gradient(135deg, #D4C4E0 0%, #9B7DB8 100%)',
  },
  'standing-up': {
    id: 'standing-up',
    title: 'Standing Up to the Bullies',
    emoji: '💪',
    description: "You're in fighter mode. Life threw things at you and you're throwing them back. Punch got dragged by his leg and he STILL came back the next day.",
    advice: "You're tougher than you think. Keep going.",
    color: '#D4726A',
    bgGradient: 'linear-gradient(135deg, #F5D5D0 0%, #D4726A 100%)',
  },
};

/**
 * Tallies weighted scores from answers and returns the highest-scoring result.
 * Scoring is intentionally loose — the quiz is for fun, not clinical accuracy.
 */
export function calculateResult(answers) {
  let scores = {
    'cinder-block': 0,
    'oran-mama': 0,
    'new-friend': 0,
    'monkey-mountain': 0,
    'sleeping-plushie': 0,
    'standing-up': 0,
  };

  // Day: how's your day going
  if (answers.day === 'terrible') { scores['cinder-block'] += 3; scores['standing-up'] += 1; }
  if (answers.day === 'rough') { scores['cinder-block'] += 2; scores['oran-mama'] += 2; }
  if (answers.day === 'meh') { scores['sleeping-plushie'] += 2; scores['oran-mama'] += 1; }
  if (answers.day === 'great') { scores['monkey-mountain'] += 3; scores['new-friend'] += 2; }

  // Need: what do you need
  if (answers.need === 'hug') { scores['oran-mama'] += 3; }
  if (answers.need === 'space') { scores['cinder-block'] += 3; }
  if (answers.need === 'friend') { scores['new-friend'] += 3; }
  if (answers.need === 'snacks') { scores['sleeping-plushie'] += 2; scores['monkey-mountain'] += 1; }

  // Cope: when things get hard
  if (answers.cope === 'hide') { scores['cinder-block'] += 3; }
  if (answers.cope === 'hold') { scores['oran-mama'] += 3; }
  if (answers.cope === 'reach') { scores['new-friend'] += 3; }
  if (answers.cope === 'pretend') { scores['standing-up'] += 2; scores['cinder-block'] += 1; }

  // Feel: today I feel like
  if (answers.feel === 'conquer') { scores['monkey-mountain'] += 3; scores['standing-up'] += 2; }
  if (answers.feel === 'survive') { scores['standing-up'] += 3; }
  if (answers.feel === 'hiding') { scores['cinder-block'] += 3; }
  if (answers.feel === 'fresh') { scores['new-friend'] += 2; scores['monkey-mountain'] += 2; }

  // Energy
  if (answers.energy === 'fire') { scores['monkey-mountain'] += 2; scores['standing-up'] += 2; }
  if (answers.energy === 'good') { scores['new-friend'] += 2; scores['monkey-mountain'] += 1; }
  if (answers.energy === 'sleepy') { scores['sleeping-plushie'] += 3; }
  if (answers.energy === 'dead') { scores['sleeping-plushie'] += 2; scores['cinder-block'] += 2; }

  // Find highest score
  let maxKey = 'oran-mama';
  let maxScore = 0;
  for (const [key, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      maxKey = key;
    }
  }

  return results[maxKey];
}
