import React, { useState } from 'react';
import { Calendar, TrendingUp, Smile } from 'lucide-react';
import { useSupabaseMoodEntries } from '../hooks/useSupabaseStorage';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './AuthModal';

const moodEmojis = [
  { value: 1, emoji: '😢', label: 'Very Sad' },
  { value: 2, emoji: '😔', label: 'Sad' },
  { value: 3, emoji: '😐', label: 'Neutral' },
  { value: 4, emoji: '😊', label: 'Happy' },
  { value: 5, emoji: '😄', label: 'Very Happy' }
];

export const MoodTracker: React.FC = () => {
  const { user } = useAuth();
  const { moodEntries, loading, addMoodEntry, deleteMoodEntry } = useSupabaseMoodEntries();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const [showChart, setShowChart] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const today = new Date().toDateString();
  const todayEntry = moodEntries.find(entry => entry.date === today);

  const saveMoodEntry = () => {
    if (selectedMood === null) return;
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    setSaving(true);
    const moodEmoji = moodEmojis.find(m => m.value === selectedMood);
    const newEntry = {
      date: today,
      mood: selectedMood,
      emoji: moodEmoji?.emoji || '😐',
      note: note.trim() || undefined
    };

    addMoodEntry(newEntry).then(() => {
      setSelectedMood(null);
      setNote('');
      setSaving(false);
    });
  };

  const getMoodStats = () => {
    if (moodEntries.length === 0) return null;
    
    const total = moodEntries.reduce((sum, entry) => sum + entry.mood, 0);
    const average = total / moodEntries.length;
    const trend = moodEntries.length > 1 ? 
      moodEntries[0].mood - moodEntries[1].mood : 0;
    
    return { average, trend };
  };

  if (!user) {
    return (
      <>
        <div className="w-full max-w-2xl mx-auto p-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Daily Mood Check-in
            </h2>
            <p className="text-gray-600 text-lg">
              Sign in to track your mood and see insights over time
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Sync Your Mood Data
            </h3>
            <p className="text-gray-600 mb-6">
              Create an account to save your mood entries and access them from any device
            </p>
            
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300"
            >
              Sign In to Continue
            </button>
          </div>
        </div>
        
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  if (showChart) {
    const stats = getMoodStats();
    
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Mood Insights</h2>
          <button
            onClick={() => setShowChart(false)}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold 
                     hover:bg-gray-300 transition-colors duration-300"
          >
            Back to Today
          </button>
        </div>

        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Average Mood</h3>
              <div className="text-4xl font-bold text-blue-500">
                {stats.average.toFixed(1)}
              </div>
              <p className="text-gray-600">out of 5.0</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Recent Trend</h3>
              <div className={`text-4xl font-bold ${stats.trend > 0 ? 'text-green-500' : stats.trend < 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {stats.trend > 0 ? '↗️' : stats.trend < 0 ? '↘️' : '→'}
              </div>
              <p className="text-gray-600">
                {stats.trend > 0 ? 'Improving' : stats.trend < 0 ? 'Declining' : 'Stable'}
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Entries</h3>
          <div className="space-y-4">
            {moodEntries.slice(0, 10).map((entry, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-4">
                  <span className="text-3xl">{entry.emoji}</span>
                  <div>
                    <p className="font-semibold text-gray-800">{entry.date}</p>
                    {entry.note && <p className="text-gray-600 text-sm">{entry.note}</p>}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-500">
                  {entry.mood}/5
                </div>
              </div>
            ))}
          </div>
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
          How are you feeling today?
        </p>
      </div>

      {todayEntry ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center mb-6">
          <div className="text-6xl mb-4">{todayEntry.emoji}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Today's Mood Recorded
          </h3>
          <p className="text-gray-600 mb-4">
            You felt {moodEmojis.find(m => m.value === todayEntry.mood)?.label.toLowerCase()} today
          </p>
          {todayEntry.note && (
            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <p className="text-gray-700 italic">"{todayEntry.note}"</p>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => {
                deleteMoodEntry(today);
              }}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold 
                       hover:bg-gray-300 transition-colors duration-300"
            >
              Update Today's Mood
            </button>
            
            <button
              onClick={() => setShowChart(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-blue-400 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300"
            >
              <TrendingUp size={16} />
              View Insights
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
              Select your mood:
            </h3>
            <div className="grid grid-cols-5 gap-4">
              {moodEmojis.map((mood) => (
                <button
                  key={mood.value}
                  onClick={() => setSelectedMood(mood.value)}
                  className={`p-4 rounded-2xl text-center transition-all duration-300 transform hover:scale-110 ${
                    selectedMood === mood.value
                      ? 'bg-gradient-to-r from-blue-400 to-purple-400 text-white shadow-lg scale-105'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <div className="text-4xl mb-2">{mood.emoji}</div>
                  <div className="text-sm font-semibold">{mood.label}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              Add a note (optional):
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today?"
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-blue-400 
                       focus:outline-none resize-none transition-colors duration-300"
              rows={3}
              maxLength={200}
            />
            <div className="text-right text-sm text-gray-500 mt-1">
              {note.length}/200
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={saveMoodEntry}
              disabled={selectedMood === null || saving}
              className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Smile size={16} />
              {saving ? 'Saving...' : 'Save Today\'s Mood'}
            </button>
            
            {moodEntries.length > 0 && (
              <button
                onClick={() => setShowChart(true)}
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-400 to-blue-400 
                         text-white rounded-full font-semibold hover:shadow-lg 
                         transform hover:scale-105 transition-all duration-300"
              >
                <TrendingUp size={16} />
                View Insights
              </button>
            )}
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </div>
  );
};