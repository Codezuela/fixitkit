import React, { useState } from 'react';
import { Heart, Volume2, VolumeX, Info, User, LogOut } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { AuthModal } from './AuthModal';

interface HeaderProps {
  onShowInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowInfo }) => {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, signOut, loading } = useAuth();

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled);
    if (!audioEnabled) {
      // Play a gentle notification sound
      const audio = new Audio('/notification.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Ignore audio play errors
      });
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <>
      <header className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white p-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="text-white" size={32} />
            <div>
              <h1 className="text-3xl font-bold">FixItKit</h1>
              <p className="text-white/90 text-sm">
                Your personal mental wellness toolkit
                {user && <span className="ml-2">• {user.email}</span>}
              </p>
            </div>
          </div>
        
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300
                       disabled:opacity-50 disabled:cursor-not-allowed"
              title="Sign out"
            >
              <LogOut size={20} />
            </button>
          ) : (
            <button
              onClick={() => setShowAuthModal(true)}
              className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
              title="Sign in to sync your data"
            >
              <User size={20} />
            </button>
          )}
          
          <button
            onClick={toggleAudio}
            className="p-3 bg-white/20 rounded-full hover:bg-white/30 transition-all duration-300"
            title={audioEnabled ? 'Disable audio' : 'Enable audio'}
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
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};