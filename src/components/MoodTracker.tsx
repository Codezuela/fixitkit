@@ .. @@
 import React, { useState } from 'react';
 import { Calendar, TrendingUp, Smile } from 'lucide-react';
-import { useLocalStorage } from '../hooks/useLocalStorage';
-import { MoodEntry } from '../types';
+import { useSupabaseMoodEntries } from '../hooks/useSupabaseStorage';
+import { useAuth } from '../hooks/useAuth';
+import { AuthModal } from './AuthModal';
 
 const moodEmojis = [
@@ .. @@
 ];
 
 export const MoodTracker: React.FC = () => {
-  const [moodEntries, setMoodEntries] = useLocalStorage<MoodEntry[]>('mood-entries', []);
+  const { user } = useAuth();
+  const { moodEntries, loading, addMoodEntry, deleteMoodEntry } = useSupabaseMoodEntries();
   const [selectedMood, setSelectedMood] = useState<number | null>(null);
   const [note, setNote] = useState('');
   const [showChart, setShowChart] = useState(false);
+  const [showAuthModal, setShowAuthModal] = useState(false);
+  const [saving, setSaving] = useState(false);
 
   const today = new Date().toDateString();
@@ .. @@
   const saveMoodEntry = () => {
     if (selectedMood === null) return;
+    if (!user) {
+      setShowAuthModal(true);
+      return;
+    }
 
+    setSaving(true);
     const moodEmoji = moodEmojis.find(m => m.value === selectedMood);
-    const newEntry: MoodEntry = {
+    const newEntry = {
       date: today,
       mood: selectedMood,
       emoji: moodEmoji?.emoji || '😐',
       note: note.trim() || undefined
     };
 
-    setMoodEntries(prev => {
-      const filtered = prev.filter(entry => entry.date !== today);
-      return [newEntry, ...filtered].slice(0, 30); // Keep last 30 days
-    });
-
-    setSelectedMood(null);
-    setNote('');
+    addMoodEntry(newEntry).then(() => {
+      setSelectedMood(null);
+      setNote('');
+      setSaving(false);
+    });
   };
 
@@ .. @@
   };
 
+  if (!user) {
+    return (
+      <>
+        <div className="w-full max-w-2xl mx-auto p-6">
+          <div className="text-center mb-8">
+            <h2 className="text-3xl font-bold text-gray-800 mb-4">
+              Daily Mood Check-in
+            </h2>
+            <p className="text-gray-600 text-lg">
+              Sign in to track your mood and see insights over time
+            </p>
+          </div>
+          
+          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
+            <div className="text-6xl mb-4">📊</div>
+            <h3 className="text-2xl font-bold text-gray-800 mb-4">
+              Sync Your Mood Data
+            </h3>
+            <p className="text-gray-600 mb-6">
+              Create an account to save your mood entries and access them from any device
+            </p>
+            
+            <button
+              onClick={() => setShowAuthModal(true)}
+              className="px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 
+                       text-white rounded-full font-semibold hover:shadow-lg 
+                       transform hover:scale-105 transition-all duration-300"
+            >
+              Sign In to Continue
+            </button>
+          </div>
+        </div>
+        
+        <AuthModal 
+          isOpen={showAuthModal} 
+          onClose={() => setShowAuthModal(false)} 
+        />
+      </>
+    );
+  }
+
   if (showChart) {
@@ .. @@
             <button
               onClick={() => {
-                setMoodEntries(prev => prev.filter(entry => entry.date !== today));
+                deleteMoodEntry(today);
               }}
               className="px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-semibold 
@@ .. @@
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button
               onClick={saveMoodEntry}
-              disabled={selectedMood === null}
+              disabled={selectedMood === null || saving}
               className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-400 to-purple-400 
                        text-white rounded-full font-semibold hover:shadow-lg 
                        transform hover:scale-105 transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             >
               <Smile size={16} />
-              Save Today's Mood
+              {saving ? 'Saving...' : 'Save Today\'s Mood'}
             </button>
             
@@ .. @@
           </div>
         </div>
       )}
+      
+      <AuthModal 
+        isOpen={showAuthModal} 
+        onClose={() => setShowAuthModal(false)} 
+      />
     </div>
   );
 };