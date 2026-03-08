/**
 * Seed confessions for the comfort object confessional
 * These populate the wall on first load so it's not empty
 * Should blend in naturally - no special marking
 */

const seedConfessions = [
  {
    id: 'seed-1',
    text: "A stuffed elephant named Gerald. He's been through 3 moves and a divorce.",
    emoji: '🧸',
    meTooCount: 47,
    createdAt: Date.now() - (2 * 60 * 60 * 1000), // 2 hours ago
    seed: true
  },
  {
    id: 'seed-2',
    text: "The same Radiohead album. Every time life gets hard.",
    emoji: '🎵',
    meTooCount: 123,
    createdAt: Date.now() - (24 * 60 * 60 * 1000), // 1 day ago
    seed: true
  },
  {
    id: 'seed-3',
    text: "My childhood blanket. I'm 34.",
    emoji: '🛏️',
    meTooCount: 156,
    createdAt: Date.now() - (12 * 60 * 60 * 1000), // 12 hours ago
    seed: true
  },
  {
    id: 'seed-4',
    text: "My morning coffee routine. It's the only part of the day that's mine.",
    emoji: '☕',
    meTooCount: 89,
    createdAt: Date.now() - (3 * 60 * 60 * 1000), // 3 hours ago
    seed: true
  },
  {
    id: 'seed-5',
    text: "My dog. She doesn't judge.",
    emoji: '🐕',
    meTooCount: 201,
    createdAt: Date.now() - (5 * 60 * 60 * 1000), // 5 hours ago
    seed: true
  },
  {
    id: 'seed-6',
    text: "Minecraft. Seriously. Building things calms me down.",
    emoji: '🎮',
    meTooCount: 78,
    createdAt: Date.now() - (2 * 24 * 60 * 60 * 1000), // 2 days ago
    seed: true
  },
  {
    id: 'seed-7',
    text: "A hoodie that still smells like my ex. I know I should wash it.",
    emoji: '🧣',
    meTooCount: 34,
    createdAt: Date.now() - (8 * 60 * 60 * 1000), // 8 hours ago
    seed: true
  },
  {
    id: 'seed-8',
    text: "Those YouTube videos of people organizing things. So satisfying.",
    emoji: '📱',
    meTooCount: 62,
    createdAt: Date.now() - (6 * 60 * 60 * 1000), // 6 hours ago
    seed: true
  },
  {
    id: 'seed-9',
    text: "My grandmother's recipe book. Half the pages are stained but I can't replace it.",
    emoji: '📖',
    meTooCount: 91,
    createdAt: Date.now() - (18 * 60 * 60 * 1000), // 18 hours ago
    seed: true
  },
  {
    id: 'seed-10',
    text: "That one friend who always answers when I text at 2am.",
    emoji: '🫂',
    meTooCount: 167,
    createdAt: Date.now() - (4 * 60 * 60 * 1000), // 4 hours ago
    seed: true
  }
];

export default seedConfessions;