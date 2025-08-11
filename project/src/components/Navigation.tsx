import React from 'react';
import { Heart, PenTool, Shuffle, BarChart3, Home } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'home', label: 'Mood Packs', icon: Heart },
    { id: 'letter', label: 'Unsent Letter', icon: PenTool },
    { id: 'random', label: 'Fix Me Now', icon: Shuffle },
    { id: 'tracker', label: 'Mood Tracker', icon: BarChart3 }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-300
                  ${isActive 
                    ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }
                `}
              >
                <Icon size={20} />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};