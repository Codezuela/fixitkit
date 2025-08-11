import React from 'react';
import { X, Heart, Shield, Smartphone } from 'lucide-react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-purple-400 to-pink-400 p-3 rounded-2xl">
                <Heart className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">About FixItKit</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is FixItKit?</h3>
              <p className="text-gray-600 leading-relaxed">
                FixItKit is your personal mental wellness toolkit designed to provide immediate, 
                accessible support when you need it most. Whether you're feeling anxious, overwhelmed, 
                or just need a mood boost, we've got you covered with scientifically-backed techniques 
                and personalized content.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-2xl">
                <Heart className="mx-auto mb-3 text-blue-500" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">Mood-Based Support</h4>
                <p className="text-sm text-gray-600">
                  Curated fix packs with grounding exercises, music, and inspiration
                </p>
              </div>
              
              <div className="text-center p-4 bg-green-50 rounded-2xl">
                <Shield className="mx-auto mb-3 text-green-500" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">Private & Safe</h4>
                <p className="text-sm text-gray-600">
                  All your data stays on your device. No accounts, no tracking
                </p>
              </div>
              
              <div className="text-center p-4 bg-purple-50 rounded-2xl">
                <Smartphone className="mx-auto mb-3 text-purple-500" size={32} />
                <h4 className="font-semibold text-gray-800 mb-2">Always Available</h4>
                <p className="text-sm text-gray-600">
                  Access support anytime, anywhere, right from your browser
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Features</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <strong>Mood-Based Fix Packs:</strong> Personalized support based on how you're feeling
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                  <strong>Unsent Letter:</strong> Therapeutic writing with symbolic release
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <strong>Random Fix:</strong> Instant mood boosters when you need them most
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <strong>Mood Tracker:</strong> Track your emotional patterns over time
                </li>
              </ul>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">Important Note</h4>
              <p className="text-yellow-700 text-sm">
                FixItKit is designed to provide emotional support and coping tools. It is not a substitute 
                for professional mental health care. If you're experiencing severe depression, anxiety, or 
                thoughts of self-harm, please reach out to a mental health professional or crisis helpline.
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                Made with ❤️ for your mental wellness journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};