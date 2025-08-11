import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Info } from 'lucide-react';

interface HeaderProps {
  onShowInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowInfo }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    // In a real app, this would control background audio
    if (!audioEnabled) {
      // Play ambient sounds
      console.log('Playing ambient sounds...');
    } else {
      // Stop ambient sounds
      console.log('Stopping ambient sounds...');
    }
  };

  return (
    <header className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white p-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-3 rounded-2xl">
            <Heart className="text-white" size={32} />
          </div>
          <div>
            <h1 className="text-3xl font-bold">FixItKit</h1>
            <p className="text-white/90 text-sm">Your personal mental wellness toolkit</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button
            onClick={toggleAudio}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
            title={audioEnabled ? 'Disable ambient sounds' : 'Enable ambient sounds'}
          >
            {audioEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
          
          <button
            onClick={onShowInfo}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
            title="About FixItKit"
          >
            <Info size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};