import React from 'react';
import { moodPacks } from '../data/moodPacks';

interface MoodSelectorProps {
  onMoodSelect: (moodId: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          How are you feeling right now?
        </h2>
        <p className="text-gray-600 text-lg">
          Choose your mood and get a personalized fix pack to help you through it
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {moodPacks.map((mood) => (
          <button
            key={mood.id}
            onClick={() => onMoodSelect(mood.id)}
            className={`
              group relative overflow-hidden rounded-2xl p-6 
              bg-gradient-to-br ${mood.gradient}
              hover:scale-105 transform transition-all duration-300
              shadow-lg hover:shadow-xl
              border-2 border-white/20 hover:border-white/40
            `}
          >
            <div className="text-center">
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                {mood.emoji}
              </div>
              <h3 className="text-white font-semibold text-sm leading-tight">
                {mood.name}
              </h3>
            </div>
            
            {/* Subtle shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                          translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </button>
        ))}
      </div>
    </div>
  );
};