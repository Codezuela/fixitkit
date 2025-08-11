import React, { useState } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { MoodSelector } from './components/MoodSelector';
import { MoodPack } from './components/MoodPack';
import { UnsentLetter } from './components/UnsentLetter';
import { RandomFix } from './components/RandomFix';
import { MoodTracker } from './components/MoodTracker';
import { InfoModal } from './components/InfoModal';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
  };

  const handleBackToMoods = () => {
    setSelectedMood(null);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
    setSelectedMood(null);
  };

  const renderCurrentView = () => {
    if (currentView === 'home') {
      if (selectedMood) {
        return <MoodPack moodId={selectedMood} onBack={handleBackToMoods} />;
      }
      return <MoodSelector onMoodSelect={handleMoodSelect} />;
    }

    switch (currentView) {
      case 'letter':
        return <UnsentLetter />;
      case 'random':
        return <RandomFix />;
      case 'tracker':
        return <MoodTracker />;
      default:
        return <MoodSelector onMoodSelect={handleMoodSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <Header onShowInfo={() => setShowInfo(true)} />
      
      <main className="pb-20 pt-8">
        {renderCurrentView()}
      </main>
      
      <Navigation currentView={currentView} onViewChange={handleViewChange} />
      
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
}

export default App;