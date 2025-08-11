import React, { useState } from 'react';
import { Calendar, TrendingUp, Smile } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MoodEntry } from '../types';

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Sad' },
  { value: 2, emoji: '😔', label: 'Sad' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😊', label: 'Great' }
];

export const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('mood-entries', []);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [showChart, setShowChart] = useState(false);

  const today = new Date().toDateString();
  const todayEntry = moodEntries.find(entry => entry.date === today);

  const saveMoodEntry = () => {
    if (selectedMood === null) return;

    const moodEmoji = moodEmojis.find(m => m.value === selectedMood);
    const newEntry: MoodEntry = {
      date: today,
      mood: selectedMood,
      emoji: moodEmoji?.emoji || '😐',
      note: note.trim() || undefined
    };

    setMoodEntries(prev => {
      const filtered = prev.filter(entry => entry.date !== today);
      return [newEntry, ...filtered].slice(0, 30); // Keep last 30 days
    });

    setSelectedMood(null);
    setNote('');
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return 0;
    const sum = moodEntries.reduce((acc, entry) => acc + entry.mood, 0);
    return (sum / moodEntries.length).toFixed(1);
  };

  const getRecentTrend = () => {
    if (moodEntries.length < 2) return 'neutral';
    const recent = moodEntries.slice(0, 3);
    const older = moodEntries.slice(3, 6);
    
    const recentAvg = recent.reduce((acc, entry) => acc + entry.mood, 0) / recent.length;
    const olderAvg = older.length > 0 ? older.reduce((acc, entry) => acc + entry.mood, 0) / older.length : recentAvg;
    
    if (recentAvg > olderAvg + 0.3) return 'improving';
    if (recentAvg < olderAvg - 0.3) return 'declining';
    return 'stable';
  };

  if (showChart) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Mood Insights</h2>
          <button
            onClick={() => setShowChart(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
          >
            Back to Tracker
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl mb-2">📊</div>
            <div className="text-2xl font-bold">{getAverageMood()}</div>
            <div className="text-blue-100">Average Mood</div>
          </div>
          
          <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-lg font-bold capitalize">{getRecentTrend()}</div>
            <div className="text-green-100">Recent Trend</div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-400 to-purple-500 rounded-2xl p-6 text-white text-center">
            <div className="text-3xl mb-2">📅</div>
            <div className="text-2xl font-bold">{moodEntries.length}</div>
            <div className="text-purple-100">Days Tracked</div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Mood History</h3>
          
          {moodEntries.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p>Start tracking your mood to see insights here</p>
            </div>
          ) : (
            <div className="space-y-4">
              {moodEntries.slice(0, 10).map((entry, index) => (
                <div key={entry.date} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{entry.emoji}</div>
                    <div>
                      <div className="font-medium text-gray-800">
                        {new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      {entry.note && (
                        <div className="text-sm text-gray-600">{entry.note}</div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((level) => (
                      <div
                        key={level}
                        className={`
                          w-3 h-3 rounded-full mx-1
                          ${level <= entry.mood ? 'bg-blue-400' : 'bg-gray-200'}
                        `}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Daily Mood Check-in
        </h2>
        <p className="text-gray-600 text-lg">
          Track how you're feeling to understand your emotional patterns
        </p>
      </div>
      
      {todayEntry ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">{todayEntry.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Today's mood recorded!
          </h3>
          <p className="text-gray-600 mb-6">
            You felt {moodEmojis.find(m => m.value === todayEntry.mood)?.label.toLowerCase()} today
          </p>
          {todayEntry.note && (
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <p className="text-gray-700 italic">"{todayEntry.note}"</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setShowChart(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-400 to-purple-400 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300"
            >
              <TrendingUp size={16} />
              View Insights
            </button>
            
            <button
              onClick={() => {
                setMoodEntries(prev => prev.filter(entry => entry.date !== today));
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold 
                       hover:bg-gray-300 transition-all duration-300"
            >
              Update Today's Mood
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">
              <Calendar />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              How are you feeling today?
            </h3>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mb-8">
            {moodEmojis.map((mood) => (
              <button
                key={mood.value}
                onClick={() => setSelectedMood(mood.value)}
                className={`
                  p-4 rounded-2xl text-center transition-all duration-300 transform
                  ${selectedMood === mood.value
                    ? 'bg-gradient-to-br from-blue-400 to-purple-400 text-white scale-110 shadow-lg'
                    : 'bg-gray-50 hover:bg-gray-100 hover:scale-105'
                  }
                `}
              >
                <div className="text-3xl mb-2">{mood.emoji}</div>
                <div className={`text-xs font-medium ${
                  selectedMood === mood.value ? 'text-white' : 'text-gray-600'
                }`}>
                  {mood.label}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add a note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-3 border-2 border-gray-200 rounded-xl resize-none 
                       focus:border-blue-400 focus:outline-none transition-colors"
              rows={3}
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={saveMoodEntry}
              disabled={selectedMood === null}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Smile size={16} />
              Save Today's Mood
            </button>
            
            {moodEntries.length > 0 && (
              <button
                onClick={() => setShowChart(true)}
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 
                         text-gray-700 rounded-full font-semibold hover:border-gray-300 
                         transition-all duration-300"
              >
                <TrendingUp size={16} />
                View Insights ({moodEntries.length})
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};