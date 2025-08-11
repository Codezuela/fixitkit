import React, { useState } from 'react';
import { Flame, Archive, Trash2, Eye } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { UnsentLetter as UnsentLetterType } from '../types';

export const UnsentLetter: React.FC = () => {
  const [letters, setLetters] = useLocalStorage<UnsentLetterType[]>('unsent-letters', []);
  const [currentLetter, setCurrentLetter] = useState('');
  const [isWriting, setIsWriting] = useState(true);
  const [isBurning, setIsBurning] = useState(false);
  const [showArchive, setShowArchive] = useState(false);

  const handleSubmit = () => {
    if (!currentLetter.trim()) return;

    const newLetter: UnsentLetterType = {
      id: Date.now().toString(),
      content: currentLetter,
      date: new Date().toLocaleDateString(),
      burned: false
    };

    setLetters(prev => [newLetter, ...prev]);
    setIsBurning(true);
    
    setTimeout(() => {
      setIsBurning(false);
      setCurrentLetter('');
      setIsWriting(false);
    }, 3000);
  };

  const burnLetter = (id: string) => {
    setLetters(prev => prev.map(letter => 
      letter.id === id ? { ...letter, burned: true } : letter
    ));
  };

  const deleteLetter = (id: string) => {
    setLetters(prev => prev.filter(letter => letter.id !== id));
  };

  if (isBurning) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-br from-orange-400 to-red-500 rounded-3xl p-12 text-white">
          <div className="text-8xl mb-6 animate-pulse">🔥</div>
          <h2 className="text-3xl font-bold mb-4">Burning your letter...</h2>
          <p className="text-xl opacity-90">
            Letting go of what you needed to say
          </p>
          <div className="mt-8">
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-white h-2 rounded-full animate-pulse" style={{
                animation: 'burn 3s ease-in-out forwards'
              }}></div>
            </div>
          </div>
        </div>
        
        <style jsx>{`
          @keyframes burn {
            0% { width: 0% }
            100% { width: 100% }
          }
        `}</style>
      </div>
    );
  }

  if (!isWriting) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 text-center">
        <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-3xl p-12 text-white mb-6">
          <div className="text-6xl mb-6">✨</div>
          <h2 className="text-3xl font-bold mb-4">Letter Burned</h2>
          <p className="text-xl opacity-90 mb-6">
            Sometimes we need to release our thoughts to find peace
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsWriting(true)}
              className="px-6 py-3 bg-white text-blue-600 rounded-full font-semibold 
                       hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Write Another Letter
            </button>
            
            <button
              onClick={() => setShowArchive(true)}
              className="px-6 py-3 bg-white/20 text-white rounded-full font-semibold 
                       hover:bg-white/30 transition-all duration-300 flex items-center gap-2"
            >
              <Archive size={16} />
              View Archive ({letters.length})
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showArchive) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Letter Archive</h2>
          <button
            onClick={() => setShowArchive(false)}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors"
          >
            Back to Writing
          </button>
        </div>
        
        <div className="grid gap-4">
          {letters.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <div className="text-4xl mb-4">📝</div>
              <p>No letters written yet</p>
            </div>
          ) : (
            letters.map((letter) => (
              <div
                key={letter.id}
                className={`
                  p-6 rounded-2xl border-2 transition-all duration-300
                  ${letter.burned 
                    ? 'bg-gray-50 border-gray-200 opacity-60' 
                    : 'bg-white border-gray-200 hover:border-gray-300'
                  }
                `}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">
                      {letter.burned ? '🔥' : '📝'}
                    </span>
                    <span className="text-sm text-gray-500">{letter.date}</span>
                  </div>
                  
                  <div className="flex gap-2">
                    {!letter.burned && (
                      <button
                        onClick={() => burnLetter(letter.id)}
                        className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
                        title="Burn this letter"
                      >
                        <Flame size={16} />
                      </button>
                    )}
                    <button
                      onClick={() => deleteLetter(letter.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete permanently"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-gray-700 whitespace-pre-wrap">
                  {letter.content.length > 200 
                    ? `${letter.content.substring(0, 200)}...` 
                    : letter.content
                  }
                </p>
                
                {letter.burned && (
                  <div className="mt-4 text-sm text-gray-500 italic">
                    This letter has been symbolically burned and released
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Write Something You'll Never Send
        </h2>
        <p className="text-gray-600 text-lg">
          Sometimes we need to express our thoughts without sending them. 
          Write freely, then let it go.
        </p>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <textarea
          value={currentLetter}
          onChange={(e) => setCurrentLetter(e.target.value)}
          placeholder="Dear... 

Write whatever is on your heart. This is your safe space to express anything you need to say but can't or won't send. Let it all out..."
          className="w-full h-64 p-4 border-2 border-gray-200 rounded-xl resize-none 
                   focus:border-blue-400 focus:outline-none transition-colors
                   text-gray-700 leading-relaxed"
          style={{ fontFamily: 'Georgia, serif' }}
        />
        
        <div className="flex justify-between items-center mt-6">
          <div className="text-sm text-gray-500">
            {currentLetter.length} characters
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowArchive(true)}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 
                       border border-gray-300 rounded-full hover:border-gray-400 transition-all duration-300"
            >
              <Eye size={16} />
              View Archive ({letters.length})
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={!currentLetter.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 
                       text-white rounded-full font-semibold hover:shadow-lg 
                       transform hover:scale-105 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Flame size={16} />
              Burn Letter
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-sm text-gray-500">
        Your letters are stored locally and privately on your device
      </div>
    </div>
  );
};