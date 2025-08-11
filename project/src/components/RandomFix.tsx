import React, { useState } from 'react';
import { Shuffle, RefreshCw, Heart, Share2 } from 'lucide-react';
import { randomFixes } from '../data/randomFixes';

export const RandomFix: React.FC = () => {
  const [currentFix, setCurrentFix] = useState(randomFixes[0]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showLove, setShowLove] = useState(false);

  const getRandomFix = () => {
    setIsAnimating(true);
    
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * randomFixes.length);
      setCurrentFix(randomFixes[randomIndex]);
      setIsAnimating(false);
    }, 500);
  };

  const handleLove = () => {
    setShowLove(true);
    setTimeout(() => setShowLove(false), 2000);
  };

  const getFixIcon = () => {
    switch (currentFix.type) {
      case 'meme': return '😂';
      case 'gif': return '✨';
      case 'quote': return '💭';
      case 'affirmation': return '🌟';
      default: return '✨';
    }
  };

  const getFixTitle = () => {
    switch (currentFix.type) {
      case 'meme': return 'Instant Mood Booster';
      case 'gif': return 'Visual Therapy';
      case 'quote': return 'Words of Wisdom';
      case 'affirmation': return 'Personal Affirmation';
      default: return 'Random Fix';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Fix Me Now! 
        </h2>
        <p className="text-gray-600 text-lg">
          Need instant relief? Get a random dose of positivity
        </p>
      </div>
      
      <div className={`
        bg-white rounded-3xl shadow-lg p-8 transition-all duration-500 transform
        ${isAnimating ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}
      `}>
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">{getFixIcon()}</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            {getFixTitle()}
          </h3>
        </div>
        
        <div className="mb-8">
          {currentFix.type === 'meme' && (
            <div className="text-center">
              <img
                src={currentFix.content}
                alt="Mood-boosting meme"
                className="mx-auto rounded-2xl shadow-lg max-w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=Meme+Loading...';
                }}
              />
              {currentFix.source && (
                <p className="mt-4 text-gray-600 italic">{currentFix.source}</p>
              )}
            </div>
          )}
          
          {currentFix.type === 'gif' && (
            <div className="text-center">
              <img
                src={currentFix.content}
                alt="Calming gif"
                className="mx-auto rounded-2xl shadow-lg max-w-full h-auto"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400x300/f3f4f6/6b7280?text=GIF+Loading...';
                }}
              />
            </div>
          )}
          
          {(currentFix.type === 'quote' || currentFix.type === 'affirmation') && (
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
              <blockquote className="text-xl text-gray-700 leading-relaxed">
                {currentFix.type === 'quote' ? `"${currentFix.content}"` : currentFix.content}
              </blockquote>
            </div>
          )}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={getRandomFix}
            disabled={isAnimating}
            className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-400 to-pink-400 
                     text-white rounded-full font-semibold hover:shadow-lg 
                     transform hover:scale-105 transition-all duration-300
                     disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {isAnimating ? (
              <>
                <RefreshCw className="animate-spin" size={20} />
                Getting your fix...
              </>
            ) : (
              <>
                <Shuffle size={20} />
                Fix Me Again!
              </>
            )}
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={handleLove}
              className={`
                p-3 rounded-full transition-all duration-300 border-2
                ${showLove 
                  ? 'bg-red-500 border-red-500 text-white scale-110' 
                  : 'bg-white border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-500'
                }
              `}
            >
              <Heart size={20} fill={showLove ? 'white' : 'none'} />
            </button>
            
            <button
              onClick={() => navigator.share?.({ 
                title: 'FixItKit helped me!', 
                text: 'Check out this mood booster from FixItKit!' 
              })}
              className="p-3 rounded-full bg-white border-2 border-gray-200 text-gray-600 
                       hover:border-blue-300 hover:text-blue-500 transition-all duration-300"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </div>
      
      {showLove && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg 
                      animate-bounce z-50">
          Glad this helped! ❤️
        </div>
      )}
    </div>
  );
};