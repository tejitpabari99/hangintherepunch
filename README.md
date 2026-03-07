# 🐒 Hang In There, Punch

The viral website for Punch the monkey — the tiny Japanese macaque who captured the world's heart with his IKEA plushie.

**Live at:** [hangintherepunch.com](https://hangintherepunch.com)

## Features

### 📜 Interactive Timeline
Scroll-driven animated timeline of Punch's life — from birth to becoming a global phenomenon. Each section reveals as you scroll with parallax effects and warm, golden-hour design.

### 📧 Email Signup
"Stay in Punch's Corner" — email signup powered by Resend (stubbed for now). Appears at the end of the timeline.

### 🧠 "I Am Punch" Mood Generator
Take a quick quiz to find your Punch moment today. Generates shareable result cards for social media.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build & Deploy

```bash
npm run build     # Build for production
npm run preview   # Preview production build
```

Deploy to Vercel:
```bash
vercel
```

## Stack

- **Vite + React** — Fast builds, HMR
- **React Router** — Client-side routing
- **Intersection Observer** — Scroll animations (no heavy libs)
- **html2canvas** — Shareable mood result cards
- **CSS Variables** — Design system
- **Vercel** — Hosting + serverless functions

## Project Structure

```
├── api/
│   └── signup.js          # Vercel serverless function (Resend stub)
├── public/
│   └── images/            # Punch images (placeholders for now)
├── src/
│   ├── components/
│   │   ├── Timeline/      # Interactive scroll timeline
│   │   ├── Signup/        # Email signup form
│   │   └── MoodGenerator/ # Quiz + result card generator
│   ├── data/              # Timeline content, quiz questions
│   ├── pages/             # Route pages
│   ├── styles/            # Global CSS + design system
│   ├── App.jsx
│   └── main.jsx
├── vercel.json
└── vite.config.js
```

## TODO

- [ ] Add real Punch images
- [ ] Connect Resend API for email signups
- [ ] Add OG image
- [ ] Analytics
- [ ] Custom domain setup

## License

Made with love for Punch. 🐒
