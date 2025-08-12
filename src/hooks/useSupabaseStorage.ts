import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

export function useSupabaseMoodEntries() {
  const { user } = useAuth();
  const [moodEntries, setMoodEntries] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchMoodEntries = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('mood_entries')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching mood entries:', error);
    } else {
      setMoodEntries(data || []);
    }
    setLoading(false);
  };

  const addMoodEntry = async (entry: {
    date: string;
    mood: number;
    emoji: string;
    note?: string;
  }) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('mood_entries')
      .insert({
        user_id: user.id,
        ...entry
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding mood entry:', error);
      return { error };
    }

    setMoodEntries(prev => [data, ...prev.filter(e => e.date !== entry.date)]);
    return { data };
  };

  const deleteMoodEntry = async (date: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('mood_entries')
      .delete()
      .eq('user_id', user.id)
      .eq('date', date);

    if (error) {
      console.error('Error deleting mood entry:', error);
      return { error };
    }

    setMoodEntries(prev => prev.filter(entry => entry.date !== date));
    return { error: null };
  };

  useEffect(() => {
    if (user) {
      fetchMoodEntries();
    } else {
      setMoodEntries([]);
    }
  }, [user]);

  return {
    moodEntries,
    loading,
    addMoodEntry,
    deleteMoodEntry,
    refetch: fetchMoodEntries
  };
}

export function useSupabaseLetters() {
  const { user } = useAuth();
  const [letters, setLetters] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchLetters = async () => {
    if (!user) return;
    
    setLoading(true);
    const { data, error } = await supabase
      .from('unsent_letters')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching letters:', error);
    } else {
      setLetters(data || []);
    }
    setLoading(false);
  };

  const addLetter = async (letter: {
    content: string;
    date: string;
    burned?: boolean;
  }) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('unsent_letters')
      .insert({
        user_id: user.id,
        ...letter
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding letter:', error);
      return { error };
    }

    setLetters(prev => [data, ...prev]);
    return { data };
  };

  const updateLetter = async (id: string, updates: { burned?: boolean }) => {
    if (!user) return;

    const { data, error } = await supabase
      .from('unsent_letters')
      .update(updates)
      .eq('id', id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (error) {
      console.error('Error updating letter:', error);
      return { error };
    }

    setLetters(prev => prev.map(letter => 
      letter.id === id ? data : letter
    ));
    return { data };
  };

  const deleteLetter = async (id: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('unsent_letters')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting letter:', error);
      return { error };
    }

    setLetters(prev => prev.filter(letter => letter.id !== id));
    return { error: null };
  };

  useEffect(() => {
    if (user) {
      fetchLetters();
    } else {
      setLetters([]);
    }
  }, [user]);

  return {
    letters,
    loading,
    addLetter,
    updateLetter,
    deleteLetter,
    refetch: fetchLetters
  };
}