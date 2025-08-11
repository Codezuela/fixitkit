import React, { useState } from 'react';
import { ArrowLeft, Play, ExternalLink, Heart, Share2 } from 'lucide-react';
import { moodPacks } from '../data/moodPacks';

interface MoodPackProps {
  moodId: string;
  onBack: () => void;
}

export const MoodPack: React.FC<MoodPackProps> = ({ moodId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'exercise' | 'music' | 'inspiration'>('exercise');
  const [exerciseStep, setExerciseStep] = useState(0);
  const [showShareMessage, setShowShareMessage] = useState(false);
  
  const mood = moodPacks.find(m => m.id === moodId);
  
  if (!mood) return null;

  const handleShare = () => {
    setShowShareMessage(true);
    setTimeout(() => setShowShareMessage(false), 3000);
  };

  const nextExerciseStep = () => {
    if (exerciseStep < mood.groundingExercise.steps.length - 1) {
      setExerciseStep(exerciseStep + 1);
    } else {
      setExerciseStep(0);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to moods
        </button>
        
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-400 to-purple-400 
                   text-white rounded-full hover:shadow-lg transition-all duration-300"
        >
          <Share2 size={16} />
          Share Fix
        </button>
      </div>

      {/* Share Message */}
      {showShareMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg 
                      animate-bounce z-50">
          Perfect for sharing! 📸✨
        </div>
      )}

      {/* Mood Header */}
      <div className={`bg-gradient-to-br ${mood.gradient} rounded-3xl p-8 text-white text-center mb-8`}>
        <div className="text-6xl mb-4">{mood.emoji}</div>
        <h1 className="text-3xl font-bold mb-2">{mood.name} Fix Pack</h1>
        <p className="text-white/90">Your personalized toolkit for feeling better</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-gray-100 rounded-full p-1 flex">
          {[
            { id: 'exercise', label: 'Grounding', icon: '🧘‍♀️' },
            { id: 'music', label: 'Music', icon: '🎵' },
            { id: 'inspiration', label: 'Inspiration', icon: '✨' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`
                px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2
                ${activeTab === tab.id 
                  ? `bg-gradient-to-r ${mood.gradient} text-white shadow-lg` 
                  : 'text-gray-600 hover:text-gray-800'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {activeTab === 'exercise' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {mood.groundingExercise.title}
            </h3>
            
            <div className="bg-gray-50 rounded-2xl p-8 mb-6">
              <div className="text-4xl mb-4">
                Step {exerciseStep + 1} of {mood.groundingExercise.steps.length}
              </div>
              <p className="text-xl text-gray-700 mb-6">
                {mood.groundingExercise.steps[exerciseStep]}
              </p>
              
              <button
                onClick={nextExerciseStep}
                className={`
                  px-8 py-4 bg-gradient-to-r ${mood.gradient} text-white rounded-full 
                  font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300
                `}
              >
                {exerciseStep < mood.groundingExercise.steps.length - 1 ? 'Next Step' : 'Start Over'}
              </button>
            </div>
            
            <div className="flex justify-center">
              <div className="flex gap-2">
                {mood.groundingExercise.steps.map((_, index) => (
                  <div
                    key={index}
                    className={`
                      w-3 h-3 rounded-full transition-all duration-300
                      ${index === exerciseStep ? `bg-gradient-to-r ${mood.gradient}` : 'bg-gray-300'}
                    `}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'music' && (
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Your Curated Playlist
            </h3>
            
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="text-6xl mb-4">🎵</div>
              <h4 className="text-xl font-semibold text-gray-800 mb-4">
                {mood.playlist.name}
              </h4>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={mood.playlist.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${mood.gradient} 
                    text-white rounded-full font-semibold hover:shadow-lg 
                    transform hover:scale-105 transition-all duration-300
                  `}
                >
                  <Play size={16} />
                  Open in Spotify
                  <ExternalLink size={16} />
                </a>
              </div>
              
              <p className="text-gray-600 mt-4 text-sm">
                Carefully curated songs to match your current mood
              </p>
            </div>
          </div>
        )}

        {activeTab === 'inspiration' && (
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">
                Words of Comfort
              </h3>
              
              <div className="bg-gray-50 rounded-2xl p-8 mb-6">
                <div className="text-4xl mb-4">💭</div>
                <blockquote className="text-xl text-gray-700 italic mb-4">
                  "{mood.quote}"
                </blockquote>
              </div>
              
              <div className={`bg-gradient-to-br ${mood.gradient} rounded-2xl p-8 text-white`}>
                <div className="text-3xl mb-4">✨</div>
                <p className="text-lg font-medium">
                  {mood.affirmation}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <img
                src={mood.gif}
                alt="Calming visual"
                className="mx-auto rounded-2xl shadow-lg max-w-md w-full"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="flex justify-center mt-8">
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 
                   rounded-full hover:border-gray-300 transition-all duration-300 group"
        >
          <Heart className="group-hover:text-red-500 transition-colors" size={16} />
          This helped me feel better
        </button>
      </div>
    </div>
  );
};