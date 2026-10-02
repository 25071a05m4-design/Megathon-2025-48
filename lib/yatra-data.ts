export type Accent = 'saffron' | 'electric' | 'jade'

export const accentText: Record<Accent, string> = {
  saffron: 'text-saffron',
  electric: 'text-electric',
  jade: 'text-jade',
}

export const accentBg: Record<Accent, string> = {
  saffron: 'bg-saffron',
  electric: 'bg-electric',
  jade: 'bg-jade',
}

export const accentVar: Record<Accent, string> = {
  saffron: 'var(--saffron)',
  electric: 'var(--electric)',
  jade: 'var(--jade)',
}

export const heroGreetings = [
  { text: 'नमस्ते', lang: 'Hindi', top: '18%', left: '4%', size: 'text-2xl', delay: 0 },
  { text: 'నమస్కారం', lang: 'Telugu', top: '12%', left: '44%', size: 'text-xl', delay: 1.2 },
  { text: 'வணக்கம்', lang: 'Tamil', top: '78%', left: '6%', size: 'text-xl', delay: 2.1 },
  { text: 'ನಮಸ್ಕಾರ', lang: 'Kannada', top: '86%', left: '46%', size: 'text-lg', delay: 0.6 },
  { text: 'നമസ്കാരം', lang: 'Malayalam', top: '20%', left: '88%', size: 'text-lg', delay: 1.8 },
  { text: 'নমস্কার', lang: 'Bengali', top: '62%', left: '92%', size: 'text-xl', delay: 2.6 },
  { text: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', lang: 'Punjabi', top: '90%', left: '78%', size: 'text-lg', delay: 3.1 },
] as const

export const helloLanguages = [
  { text: 'हिन्दी', from: { x: -160, y: 0 }, size: 'text-6xl md:text-8xl', accent: 'saffron' as Accent },
  { text: 'తెలుగు', from: { x: 0, y: 120 }, size: 'text-5xl md:text-7xl', accent: null },
  { text: 'தமிழ்', from: { x: 160, y: 0 }, size: 'text-6xl md:text-8xl', accent: 'electric' as Accent },
  { text: 'ಕನ್ನಡ', from: { x: 0, y: -120 }, size: 'text-4xl md:text-6xl', accent: null },
  { text: 'മലയാളം', from: { x: -120, y: 80 }, size: 'text-5xl md:text-7xl', accent: 'jade' as Accent },
  { text: 'मराठी', from: { x: 140, y: -60 }, size: 'text-4xl md:text-6xl', accent: null },
  { text: 'বাংলা', from: { x: -100, y: -100 }, size: 'text-6xl md:text-8xl', accent: null },
  { text: 'ગુજરાતી', from: { x: 120, y: 100 }, size: 'text-4xl md:text-6xl', accent: 'saffron' as Accent },
  { text: 'ਪੰਜਾਬੀ', from: { x: 0, y: 140 }, size: 'text-5xl md:text-7xl', accent: null },
]

export const capabilities = [
  {
    id: 'ocr',
    index: '01',
    verb: 'SEE',
    tech: 'OCR',
    accent: 'saffron' as Accent,
    description: 'Point at any sign, menu or plaque. YATRA reads 22 Indian scripts in real time.',
  },
  {
    id: 'asr',
    index: '02',
    verb: 'SPEAK',
    tech: 'ASR',
    accent: 'electric' as Accent,
    description: 'Ask in Hinglish, Tamil or Bengali. Speech becomes text, accents and all.',
  },
  {
    id: 'mt',
    index: '03',
    verb: 'UNDERSTAND',
    tech: 'MT',
    accent: 'jade' as Accent,
    description: 'Context-aware translation that keeps cultural meaning, not just words.',
  },
  {
    id: 'tts',
    index: '04',
    verb: 'LISTEN',
    tech: 'TTS',
    accent: 'saffron' as Accent,
    description: 'Natural voices read translations and audio guides back to you.',
  },
  {
    id: 'vision',
    index: '05',
    verb: 'DISCOVER',
    tech: 'VISION',
    accent: 'electric' as Accent,
    description: 'Recognise landmarks, food and art — and unlock the stories behind them.',
  },
]

export const constellationLanguages = [
  { name: 'Hindi', native: 'हिन्दी', greeting: 'नमस्ते', translit: 'Namaste', ring: 0 },
  { name: 'Telugu', native: 'తెలుగు', greeting: 'నమస్కారం', translit: 'Namaskaram', ring: 0 },
  { name: 'Tamil', native: 'தமிழ்', greeting: 'வணக்கம்', translit: 'Vanakkam', ring: 0 },
  { name: 'Kannada', native: 'ಕನ್ನಡ', greeting: 'ನಮಸ್ಕಾರ', translit: 'Namaskara', ring: 1 },
  { name: 'Malayalam', native: 'മലയാളം', greeting: 'നമസ്കാരം', translit: 'Namaskaram', ring: 1 },
  { name: 'Marathi', native: 'मराठी', greeting: 'नमस्कार', translit: 'Namaskar', ring: 1 },
  { name: 'Bengali', native: 'বাংলা', greeting: 'নমস্কার', translit: 'Nomoshkar', ring: 1 },
  { name: 'Gujarati', native: 'ગુજરાતી', greeting: 'નમસ્તે', translit: 'Namaste', ring: 2 },
  { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', greeting: 'ਸਤ ਸ੍ਰੀ ਅਕਾਲ', translit: 'Sat Sri Akal', ring: 2 },
  { name: 'Odia', native: 'ଓଡ଼ିଆ', greeting: 'ନମସ୍କାର', translit: 'Namaskara', ring: 2 },
]

export const destinations = [
  {
    name: 'HYDERABAD',
    languages: 'తెలుగు · اردو · हिंदी',
    tagline: 'Where history meets the city.',
    coords: '17.3850° N, 78.4867° E',
    image: '/images/charminar.png',
  },
  {
    name: 'VARANASI',
    languages: 'हिंदी · भोजपुरी',
    tagline: 'The oldest living conversation.',
    coords: '25.3176° N, 82.9739° E',
    image: '/images/varanasi.png',
  },
  {
    name: 'JAIPUR',
    languages: 'हिंदी · राजस्थानी',
    tagline: 'A city that blushes at dusk.',
    coords: '26.9124° N, 75.7873° E',
    image: '/images/jaipur.png',
  },
  {
    name: 'GOA',
    languages: 'कोंकणी · मराठी · English',
    tagline: 'Salt, sun and susegad.',
    coords: '15.2993° N, 74.1240° E',
    image: '/images/goa.png',
  },
  {
    name: 'KERALA',
    languages: 'മലയാളം',
    tagline: 'Slow water, deep green.',
    coords: '9.4981° N, 76.3388° E',
    image: '/images/kerala.png',
  },
  {
    name: 'MYSURU',
    languages: 'ಕನ್ನಡ',
    tagline: 'A palace of a hundred thousand lights.',
    coords: '12.2958° N, 76.6394° E',
    image: '/images/mysuru.png',
  },
  {
    name: 'DELHI',
    languages: 'हिंदी · ਪੰਜਾਬੀ · اردو',
    tagline: 'Seven cities in one.',
    coords: '28.6139° N, 77.2090° E',
    image: '/images/delhi.png',
  },
]

export const assistantReplies: Record<string, string> = {
  TRANSLATE: 'Translated from Telugu: "Charminar — open daily, 9:00 AM to 5:30 PM. Entry ₹25."',
  SPEAK: 'Playing in your language now. Tap again to switch the voice to Hindi or Tamil.',
  'SHOW ON MAP': 'Charminar is 1.2 km north-east. Laad Bazaar bangle market is a 3-minute walk from its west arch.',
  'TELL ME MORE':
    'Built in 1591 by Sultan Muhammad Quli Qutb Shah, Charminar marked the founding of Hyderabad — legend says to celebrate the end of a plague.',
}
