/**
 * Timeline data — each entry is a chapter in Punch's story.
 * Ordered chronologically. Sources provide credibility with traceable references.
 * detailContent powers the expanded /timeline/:id detail pages.
 */

/** Format a date string like '2026-03-05' → 'Mar 5' */
export function formatShortDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export const timelineSections = [
  {
    id: 'born',
    anchor: 'born',
    title: 'Born into Silence',
    date: 'JULY 2025',
    dateLabel: 'July 2025 — Born into silence',
    emoji: '⭐',
    sectionColor: '#D4A052',
    gradient: 'linear-gradient(180deg, #FAF5EE 0%, #E8E0D8 50%, #D4CCC4 100%)',
    placeholderGradient: 'linear-gradient(135deg, #E8DDD0 0%, #C4B8A8 60%, #A89888 100%)',
    placeholderAccent: '#D4A052',
    content: `Punch was born at Ichikawa City Zoo, just outside Tokyo, on a sweltering July day. His mother abandoned him almost immediately — likely exhausted from a brutal heatwave.`,
    detail: `In the wild, that's a death sentence. He was the smallest monkey anyone had seen in years. But two zookeepers stepped in. They bottle-fed him every few hours, kept him warm through the night, and refused to give up on him.`,
    imageAlt: 'A tiny newborn macaque, alone',
    sources: [
      { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c', date: '2026-02-17' },
    ],
    detailContent: {
      bodyHtml: `<p>Punch was born on July 26, 2025, during a blistering heatwave at Ichikawa City Zoo in Chiba Prefecture, just outside Tokyo. His mother, overwhelmed by the extreme temperatures, abandoned him almost immediately after birth.</p>
<p>In the wild, an abandoned infant macaque has almost no chance of survival. They depend entirely on their mothers for warmth, food, and protection during their first months of life. Punch was the smallest monkey the zoo staff had seen in years.</p>
<p>But two dedicated zookeepers refused to let him go. They took turns bottle-feeding him every few hours around the clock, keeping him warm through the night, and monitoring his fragile health. It was grueling work — newborn macaques need constant attention — but they were determined.</p>
<p>This act of devotion would shape everything that came next. Without a mother, Punch would need to find comfort somewhere else entirely.</p>`,
      media: [],
      sources: [
        { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c', date: '2026-02-17' },
      ],
    },
  },
  {
    id: 'named',
    anchor: 'named',
    title: 'They Named Him Punch',
    date: 'AUGUST 2025',
    dateLabel: 'August 2025 — They named him Punch',
    emoji: '✨',
    sectionColor: '#D4A052',
    gradient: 'linear-gradient(180deg, #D4CCC4 0%, #F5E6D0 50%, #FAF5EE 100%)',
    placeholderGradient: 'linear-gradient(135deg, #F5E6D0 0%, #E8D4B8 60%, #D4C0A0 100%)',
    placeholderAccent: '#D4A052',
    content: `They named him after Monkey Punch — the legendary mangaka who created Lupin the Third. A name for a trickster. A fighter. Someone who'd have to be clever to survive.`,
    detail: `The zookeepers became his world. They were the only family he'd ever known. And for a while, that was enough.`,
    funFact: {
      icon: '💡',
      title: 'Who was Monkey Punch?',
      text: 'Kazuhiko Katō (1937–2019), pen name Monkey Punch, created Lupin the Third — one of the longest-running manga series in history. A trickster who always found a way.',
    },
    imageAlt: 'Punch being held by a zookeeper',
    sources: [
      { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2025-08' },
    ],
    detailContent: {
      bodyHtml: `<p>The zookeepers chose the name "Punch" as a tribute to Monkey Punch — the pen name of Kazuhiko Katō (1937–2019), the legendary manga artist who created <em>Lupin the Third</em>, one of the longest-running and most beloved manga series in history.</p>
<p>It was a name that carried weight. Monkey Punch's most famous character, Arsène Lupin III, was a trickster, a survivor, someone who always found a way out of impossible situations through cleverness and charm. The zookeepers hoped their tiny monkey would live up to the name.</p>
<p>For those first weeks and months, the zookeepers were Punch's entire universe. They fed him, held him, and gave him the warmth his mother never did. It was a fragile existence — beautiful but unsustainable. A monkey raised only by humans would never learn to be a monkey.</p>`,
      media: [],
      sources: [
        { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2025-08' },
      ],
    },
  },
  {
    id: 'oranmama',
    anchor: 'oranmama',
    title: 'He Needed Something to Hold Onto',
    date: 'FALL 2025',
    dateLabel: 'Fall 2025 — Finding Oran-Mama',
    emoji: '🧸',
    sectionColor: '#E8C4B8',
    gradient: 'linear-gradient(180deg, #FAF5EE 0%, #FFF5EE 50%, #FAF0E6 100%)',
    placeholderGradient: 'linear-gradient(135deg, #FAE8D8 0%, #E8C4B0 60%, #D4A888 100%)',
    placeholderAccent: '#E8C4B8',
    isKeyMoment: true,
    content: `Baby monkeys need to cling. It's not cute — it's survival. Without a mother to hold, Punch had nothing.`,
    detail: `The zookeepers gave him an IKEA Djungelskog orangutan plushie. He grabbed on and wouldn't let go. He slept with it. Ate with it. Dragged it everywhere. The internet would later name her "Oran-Mama."`,
    pullQuote: 'He held on like his life depended on it. Because it did.',
    imageAlt: 'Punch clinging tightly to his IKEA orangutan plushie',
    sources: [
      { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c', date: '2026-02-17' },
    ],
    detailContent: {
      bodyHtml: `<p>Baby monkeys are born with an overwhelming instinct to cling. It's not a cute behavior — it's a survival mechanism hardwired over millions of years of evolution. In the wild, an infant macaque clings to its mother's fur for warmth, safety, and comfort. Without something to hold onto, they become stressed, anxious, and developmentally delayed.</p>
<p>The zookeepers understood this. They gave Punch an IKEA Djungelskog stuffed orangutan — a large, soft plushie that was roughly the right size and shape for a baby monkey to cling to. Punch grabbed it immediately and wouldn't let go.</p>
<p>He slept with it. Ate with it. Dragged it through dirt and water. When he was scared, he buried his face in its soft fur. The plushie became his surrogate mother — his source of comfort in a world that had already let him down once.</p>
<p>The internet would later give her a name: "Oran-Mama" (a play on orangutan + mama). But to Punch, she was simply everything.</p>`,
      media: [],
      sources: [
        { label: 'Mainichi', url: 'https://mainichi.jp/english/articles/20260217/p2a/00m/0li/008000c', date: '2026-02-17' },
        { label: 'Zoo Statements', url: 'https://x.com/ichikawa_zoo/', date: '2025' },
      ],
    },
  },
  {
    id: 'mountain',
    anchor: 'mountain',
    title: 'Time to Face the Mountain',
    date: 'JANUARY 19, 2026',
    dateLabel: 'January 2026 — Into the wild',
    emoji: '🏔️',
    sectionColor: '#4A5D4A',
    gradient: 'linear-gradient(180deg, #FAF0E6 0%, #EEF2EE 50%, #E0E8E0 100%)',
    placeholderGradient: 'linear-gradient(135deg, #C8D8C0 0%, #8BA888 60%, #5A7A58 100%)',
    placeholderAccent: '#4A5D4A',
    bigNumber: '60+',
    content: `Punch couldn't stay with the zookeepers forever. To be a monkey, he had to live with monkeys.`,
    detail: `Monkey Mountain: 60+ Japanese macaques. A hierarchy. Politics. Teeth. On January 19, tiny Punch — still clutching Oran-Mama — walked into the group.`,
    imageAlt: 'The vast Monkey Mountain enclosure',
    sources: [
      { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-01-19' },
    ],
    detailContent: {
      bodyHtml: `<p>As much as the zookeepers loved Punch, they knew he couldn't stay in their care forever. A monkey raised only by humans would never develop the social skills needed to survive in a troop. He had to learn to be a monkey — and that meant living with other monkeys.</p>
<p>On January 19, 2026, tiny Punch was introduced to Monkey Mountain — the zoo's main macaque enclosure, home to over 60 Japanese macaques. It's a complex social hierarchy with established power dynamics, alliances, and rivalries.</p>
<p>Punch walked in still clutching Oran-Mama. He was the smallest one there by far. The other monkeys watched him with a mixture of curiosity and indifference. The zookeepers watched from the sidelines, hoping for the best but prepared for the worst.</p>
<p>The integration had begun.</p>`,
      media: [],
      sources: [
        { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-01-19' },
      ],
    },
  },
  {
    id: 'viral',
    anchor: 'viral',
    title: 'They Came for Him',
    subtitle: 'And 11 million people watched.',
    date: 'FEBRUARY 19, 2026',
    dateLabel: 'February 2026 — The hard days',
    emoji: '😢',
    sectionColor: '#6B6B7B',
    gradient: 'linear-gradient(180deg, #E0E8E0 0%, #E0DDD8 50%, #D8D4D0 100%)',
    placeholderGradient: 'linear-gradient(135deg, #D8D0C8 0%, #B0A898 60%, #887868 100%)',
    placeholderAccent: '#6B6B7B',
    isEmotionalPeak: true,
    viewCount: 11000000,
    content: `The other monkeys didn't welcome Punch. They bullied him. Stole his food. Pushed him around. A video of Punch — tiny, alone, clutching his plushie while bigger monkeys circled — went mega-viral.`,
    detail: `He hid in a cinder block shelter, holding Oran-Mama, waiting for the world to be kinder. And the world responded with a feeling that swept the internet:`,
    punchQuote: 'I am Punch, and he is me.',
    imageAlt: 'Punch hiding in a cinder block with his plushie',
    sources: [
      { label: '@tate_gf (X)', url: 'https://x.com/tate_gf/status/1892610050594455887', date: '2026-02-19' },
      { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-02' },
    ],
    detailContent: {
      bodyHtml: `<p>The integration didn't go smoothly. The older, established monkeys saw Punch as an outsider. They bullied him — stealing his food, pushing him away from warm spots, and generally making his life miserable.</p>
<p>On February 19, 2026, a visitor captured a video that would change everything. In it, tiny Punch sits alone in a cinder block shelter, clutching his Djungelskog plushie tightly while larger monkeys circle around him. He looks scared, alone, and heartbreakingly small.</p>
<p>The video, posted by @tate_gf on X (formerly Twitter), exploded. It racked up over 11 million views within days. People around the world saw themselves in this tiny monkey — holding onto something soft while the world felt hostile.</p>
<p>"I am Punch, and he is me" became the defining sentiment. It wasn't just sympathy. It was recognition. Everyone has been the small one clinging to their comfort object in a world that feels too big and too mean.</p>`,
      media: [],
      sources: [
        { label: '@tate_gf (X)', url: 'https://x.com/tate_gf/status/1892610050594455887', date: '2026-02-19' },
        { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-02' },
      ],
    },
  },
  {
    id: 'world',
    anchor: 'world',
    title: 'The World Held On Too',
    date: 'FEBRUARY 2026',
    dateLabel: 'February 2026 — The world notices',
    emoji: '🌍',
    sectionColor: '#D4A052',
    gradient: 'linear-gradient(180deg, #D8D4D0 0%, #F0E8DD 50%, #FAF5EE 100%)',
    placeholderGradient: 'linear-gradient(135deg, #F0E0C8 0%, #D4B488 60%, #C0A070 100%)',
    placeholderAccent: '#D4A052',
    priceData: { from: 19.99, to: 350 },
    bigNumber: '33',
    content: `NYT. CNN. NPR. AP. Fox News. The Guardian. Google added an Easter egg. #HangInTherePunch trended worldwide.`,
    detail: `IKEA donated 33 Djungelskog toys to the zoo. The original $20 plush sold out globally — reselling for $350 on eBay. People didn't just want to watch Punch. They wanted to hold what he held.`,
    imageAlt: 'Global news coverage and IKEA plushie frenzy',
    sources: [
      { label: 'NYT', url: 'https://nytimes.com/', date: '2026-03' },
      { label: 'AP News', url: 'https://apnews.com/', date: '2026-03-05' },
      { label: 'CNN', url: 'https://cnn.com/', date: '2026-03' },
      { label: 'USA Today', url: 'https://usatoday.com/', date: '2026-03' },
    ],
    detailContent: {
      bodyHtml: `<p>Punch's story didn't just go viral — it went global. Within days of the bullying video, every major news outlet in the world was covering the tiny monkey with the big plushie.</p>
<p>The New York Times, CNN, NPR, AP, Fox News, The Guardian, BBC — they all ran the story. Google added a special Easter egg when you searched for Punch. #HangInTherePunch trended worldwide on social media.</p>
<p>IKEA, recognizing their Djungelskog orangutan had become the world's most famous comfort object, donated 33 plushies to Ichikawa City Zoo. The gesture was both generous and savvy — the original $20 plushie had sold out globally and was reselling for up to $350 on eBay.</p>
<p>People didn't just want to watch Punch's story unfold. They wanted to hold what he held. They wanted their own Oran-Mama. The zoo saw record attendance, with over 5,200 visitors on peak days — all coming to see one small monkey.</p>`,
      media: [],
      sources: [
        { label: 'NYT', url: 'https://nytimes.com/', date: '2026-03' },
        { label: 'AP News', url: 'https://apnews.com/', date: '2026-03-05' },
        { label: 'CNN', url: 'https://cnn.com/', date: '2026-03' },
        { label: 'USA Today', url: 'https://usatoday.com/', date: '2026-03' },
      ],
    },
  },
  {
    id: 'growing',
    anchor: 'growing',
    title: 'He Started to Let Go',
    date: 'MARCH 2026',
    dateLabel: 'March 2026 — Making friends',
    emoji: '🌱',
    sectionColor: '#4A5D4A',
    gradient: 'linear-gradient(180deg, #FAF5EE 0%, #F5EEE4 50%, #F0E8D8 100%)',
    placeholderGradient: 'linear-gradient(135deg, #D8E8C8 0%, #A8C890 60%, #80B068 100%)',
    placeholderAccent: '#4A5D4A',
    isBreathingSection: true,
    content: `Slowly, Punch found his place. He made a friend — a real one, not made of polyester.`,
    detail: `He still carries Oran-Mama sometimes. But not always. Not like before. He's learning that the world isn't just teeth and cold shoulders. Some of it is warm on its own.`,
    imageAlt: 'Punch with other monkeys, no longer clinging to plushie',
    sources: [
      { label: 'AP News', url: 'https://apnews.com/', date: '2026-03-05' },
      { label: 'Business Insider', url: 'https://businessinsider.com/', date: '2026-03-03' },
    ],
    detailContent: {
      bodyHtml: `<p>Slowly, almost imperceptibly at first, things started to change. Punch began to find his place in the troop's hierarchy — not at the top, but somewhere safe enough to exist.</p>
<p>He made his first real friend — another young monkey who was curious rather than hostile. They started playing together, grooming each other, sharing food. Simple monkey things that meant the world.</p>
<p>The zookeepers noticed something else: Punch was carrying Oran-Mama less. Not abandoning her — never that — but putting her down sometimes to go play, to explore, to interact with other monkeys without the safety blanket.</p>
<p>He was learning that the world isn't just teeth and cold shoulders. Some of it is warm on its own. Some connections don't require a stuffed intermediary.</p>
<p>By early March, Punch was eating independently, playing with other baby monkeys regularly, and even receiving grooming from peers — a key sign of social acceptance in macaque society.</p>`,
      media: [],
      sources: [
        { label: 'AP News', url: 'https://apnews.com/', date: '2026-03-05' },
        { label: 'Business Insider', url: 'https://businessinsider.com/', date: '2026-03-03' },
      ],
    },
  },
  {
    id: 'today',
    anchor: 'today',
    title: 'Today',
    date: 'RIGHT NOW',
    dateLabel: 'Today — The story continues',
    emoji: '💛',
    sectionColor: '#D4A052',
    gradient: 'linear-gradient(180deg, #F0E8D8 0%, #FAF5EE 50%, #FAF5EE 100%)',
    placeholderGradient: 'linear-gradient(135deg, #F5E8C8 0%, #E8D0A0 60%, #D4B880 100%)',
    placeholderAccent: '#D4A052',
    isLive: true,
    // isCTA removed — signup now lives in its own standalone section
    content: `Punch's story isn't over. Neither is yours.`,
    detail: `Sometimes you're the monkey clinging to the plushie. Sometimes you're the one making a new friend. Sometimes you're hiding in the cinder block, and that's okay too. The point is — you keep going.`,
    imageAlt: 'Punch looking toward the future',
    sources: [
      { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-03' },
    ],
    detailContent: {
      bodyHtml: `<p>Punch's story isn't over. It's still being written, one day at a time.</p>
<p>The zoo continues to post updates on their social media, and millions of people around the world check in regularly. Each new photo or video of Punch playing with other monkeys, eating on his own, or — yes — still occasionally cuddling with Oran-Mama, brings a wave of collective joy.</p>
<p>Sometimes you're the monkey clinging to the plushie. Sometimes you're the one making a new friend. Sometimes you're hiding in the cinder block, and that's okay too.</p>
<p>The point is — you keep going. You hold on to what you need for as long as you need it. And when you're ready, you put it down and take a step forward.</p>
<p>Hang in there, Punch. We're all rooting for you. 🐒</p>`,
      media: [],
      sources: [
        { label: 'Ichikawa Zoo (X)', url: 'https://x.com/ichikawa_zoo/', date: '2026-03' },
      ],
    },
  },
];
