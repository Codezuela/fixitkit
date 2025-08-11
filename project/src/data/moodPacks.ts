import { MoodPack } from '../types';

export const moodPacks: MoodPack[] = [
  {
    id: 'dramatic',
    name: 'Dramatic Melodies',
    emoji: '🎭',
    color: 'purple',
    gradient: 'from-purple-400 to-pink-400',
    groundingExercise: {
      title: '5-4-3-2-1 Grounding Technique',
      steps: [
        '5 things you can see around you',
        '4 things you can touch',
        '3 things you can hear',
        '2 things you can smell',
        '1 thing you can taste'
      ]
    },
    playlist: {
      name: 'Dramatic Melodies',
      url: 'https://open.spotify.com/playlist/5tKUeSMJ4Nl7IrPGo27REY',
      embedId: '5tKUeSMJ4Nl7IrPGo27REY'
    },
    quote: "Every emotion is a messenger. Listen to what your heart is trying to tell you.",
    affirmation: "I honor my feelings and allow myself to feel deeply.",
    gif: 'https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif'
  },
  {
    id: 'romance',
    name: 'Romance & Situationships',
    emoji: '💕',
    color: 'pink',
    gradient: 'from-pink-400 to-rose-400',
    groundingExercise: {
      title: 'Heart-Centered Breathing',
      steps: [
        'Place your hand on your heart',
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 6 counts',
        'Repeat 5 times, feeling your heartbeat'
      ]
    },
    playlist: {
      name: 'Romance & Situationships',
      url: 'https://open.spotify.com/playlist/3dLJmBroeWwmBL5srrVBOq',
      embedId: '3dLJmBroeWwmBL5srrVBOq'
    },
    quote: "You deserve love that feels like home, not a battlefield.",
    affirmation: "I am worthy of genuine love and healthy relationships.",
    gif: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif'
  },
  {
    id: 'spiritual',
    name: 'Spiritual Comfort',
    emoji: '🙏',
    color: 'blue',
    gradient: 'from-blue-400 to-indigo-400',
    groundingExercise: {
      title: 'Mindful Gratitude',
      steps: [
        'Close your eyes and take three deep breaths',
        'Think of 3 things you\'re grateful for today',
        'Feel the warmth of gratitude in your chest',
        'Send loving thoughts to yourself',
        'Open your eyes when ready'
      ]
    },
    playlist: {
      name: 'Spiritual Comfort',
      url: 'https://open.spotify.com/playlist/5QagC4XnLWv1PKVuWLCJMp',
      embedId: '5QagC4XnLWv1PKVuWLCJMp'
    },
    quote: "In the quiet moments, you'll find the strength you've been searching for.",
    affirmation: "I am connected to something greater than myself.",
    gif: 'https://media.giphy.com/media/l0HlHFRbmaZtBRhXG/giphy.gif'
  },
  {
    id: 'energetic',
    name: 'Crazy Fun Energy',
    emoji: '🤪',
    color: 'yellow',
    gradient: 'from-yellow-400 to-orange-400',
    groundingExercise: {
      title: 'Energy Release Dance',
      steps: [
        'Stand up and shake your hands vigorously for 10 seconds',
        'Jump up and down 5 times',
        'Do 3 big arm circles',
        'Take 3 deep breaths',
        'Smile as wide as you can!'
      ]
    },
    playlist: {
      name: 'Crazy Fun (English)',
      url: 'https://open.spotify.com/playlist/74xwGDPETRk0zbrXWsJdQ6',
      embedId: '74xwGDPETRk0zbrXWsJdQ6'
    },
    quote: "Life is too short to be serious all the time. Dance like nobody's watching!",
    affirmation: "I embrace joy and allow myself to be playful.",
    gif: 'https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif'
  },
  {
    id: 'hype',
    name: 'Beat Drop Hype',
    emoji: '🔥',
    color: 'red',
    gradient: 'from-red-400 to-pink-400',
    groundingExercise: {
      title: 'Power Pose',
      steps: [
        'Stand with feet shoulder-width apart',
        'Put your hands on your hips',
        'Lift your chin up',
        'Take 5 deep, powerful breaths',
        'Say "I am strong" out loud'
      ]
    },
    playlist: {
      name: 'Beat Drops',
      url: 'https://open.spotify.com/playlist/26FNC7mys5Pn7OUpiBlBdM',
      embedId: '26FNC7mys5Pn7OUpiBlBdM'
    },
    quote: "You have survived 100% of your worst days. You're stronger than you think.",
    affirmation: "I am powerful, capable, and ready to conquer anything.",
    gif: 'https://media.giphy.com/media/l0HlBO7eyXzSZkJri/giphy.gif'
  },
  {
    id: 'baddie',
    name: 'Baddie Energy',
    emoji: '💅',
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-400',
    groundingExercise: {
      title: 'Confidence Affirmations',
      steps: [
        'Look in a mirror (or imagine one)',
        'Make eye contact with yourself',
        'Say "I am enough" 3 times',
        'Say "I am worthy" 3 times',
        'Wink at yourself and smile'
      ]
    },
    playlist: {
      name: 'Baddie Energy',
      url: 'https://open.spotify.com/playlist/56QQdvlv6Q9sZJGakA49yo',
      embedId: '56QQdvlv6Q9sZJGakA49yo'
    },
    quote: "You're not just surviving, you're thriving. Own your power.",
    affirmation: "I am confident, fierce, and unapologetically myself.",
    gif: 'https://media.giphy.com/media/l0HlPystfePnAI3G8/giphy.gif'
  },
  {
    id: 'revenge',
    name: 'It Girl Revenge',
    emoji: '👑',
    color: 'violet',
    gradient: 'from-violet-400 to-purple-400',
    groundingExercise: {
      title: 'Crown Visualization',
      steps: [
        'Sit or stand tall with perfect posture',
        'Imagine a golden crown on your head',
        'Feel its weight reminding you of your worth',
        'Breathe in confidence, breathe out doubt',
        'Remember: you are royalty'
      ]
    },
    playlist: {
      name: 'It Girl Revenge Energy',
      url: 'https://open.spotify.com/playlist/5unk9rUHr6VRKwJcztdc7j',
      embedId: '5unk9rUHr6VRKwJcztdc7j'
    },
    quote: "The best revenge is becoming the person you were meant to be.",
    affirmation: "I rise above negativity and shine brighter than ever.",
    gif: 'https://media.giphy.com/media/l0HlGP7NNrLOYqKpW/giphy.gif'
  },
  {
    id: 'sad',
    name: 'Sad Hours',
    emoji: '😢',
    color: 'slate',
    gradient: 'from-slate-400 to-gray-400',
    groundingExercise: {
      title: 'Gentle Self-Compassion',
      steps: [
        'Place both hands on your heart',
        'Take slow, gentle breaths',
        'Say "This feeling will pass"',
        'Say "I am not alone in this"',
        'Give yourself a gentle hug'
      ]
    },
    playlist: {
      name: 'Sad Hours',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DWSqBruwoIXkA',
      embedId: '37i9dQZF1DWSqBruwoIXkA'
    },
    quote: "It's okay to not be okay. Your feelings are valid, and this too shall pass.",
    affirmation: "I allow myself to feel and trust that healing is happening.",
    gif: 'https://media.giphy.com/media/l0HlR2Q80bGAEXlHG/giphy.gif'
  },
  {
    id: 'retro',
    name: 'Retro Vibes',
    emoji: '✨',
    color: 'amber',
    gradient: 'from-amber-400 to-yellow-400',
    groundingExercise: {
      title: 'Nostalgic Breathing',
      steps: [
        'Think of a happy memory from the past',
        'Breathe in the good feelings from that memory',
        'Hold that warmth in your chest',
        'Breathe out any current stress',
        'Smile at the beautiful moments you\'ve lived'
      ]
    },
    playlist: {
      name: 'Retro Mix',
      url: 'https://open.spotify.com/playlist/37i9dQZF1EIeaq4GvA0R5R',
      embedId: '37i9dQZF1EIeaq4GvA0R5R'
    },
    quote: "Sometimes looking back helps us appreciate how far we've come.",
    affirmation: "I honor my journey and celebrate my growth.",
    gif: 'https://media.giphy.com/media/l0HlNyrvLKBMxjFzG/giphy.gif'
  },
  {
    id: 'gloomy',
    name: 'Hangover Cure',
    emoji: '🌧️',
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-400',
    groundingExercise: {
      title: 'Gentle Recovery',
      steps: [
        'Drink a sip of water slowly',
        'Take 3 very slow, deep breaths',
        'Gently massage your temples',
        'Say "I am healing" quietly',
        'Rest your eyes for 30 seconds'
      ]
    },
    playlist: {
      name: 'Hangover Cure - Gloomy Day',
      url: 'https://open.spotify.com/playlist/37i9dQZF1DX3VYC8t7sFAb',
      embedId: '37i9dQZF1DX3VYC8t7sFAb'
    },
    quote: "Be gentle with yourself. Recovery takes time, and that's perfectly okay.",
    affirmation: "I treat myself with kindness and patience as I heal.",
    gif: 'https://media.giphy.com/media/l0HlNQ03J5JxX6lva/giphy.gif'
  }
];