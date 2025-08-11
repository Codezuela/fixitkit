export interface MoodPack {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
  groundingExercise: {
    title: string;
    steps: string[];
  };
  playlist: {
    name: string;
    url: string;
    embedId: string;
  };
  quote: string;
  affirmation: string;
  gif: string;
}

export interface UnsentLetter {
  id: string;
  content: string;
  date: string;
  burned: boolean;
}

export interface MoodEntry {
  date: string;
  mood: number;
  emoji: string;
  note?: string;
}

export interface RandomFix {
  type: 'meme' | 'gif' | 'quote' | 'affirmation';
  content: string;
  source?: string;
}