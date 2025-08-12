export interface Database {
  public: {
    Tables: {
      mood_entries: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          mood: number;
          emoji: string;
          note: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          date: string;
          mood: number;
          emoji?: string;
          note?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          date?: string;
          mood?: number;
          emoji?: string;
          note?: string | null;
          created_at?: string;
        };
      };
      unsent_letters: {
        Row: {
          id: string;
          user_id: string;
          content: string;
          date: string;
          burned: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          content: string;
          date: string;
          burned?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          content?: string;
          date?: string;
          burned?: boolean;
          created_at?: string;
        };
      };
    };
  };
}