@@ .. @@
 import React, { useState } from 'react';
 import { Flame, Archive, Trash2, Eye } from 'lucide-react';
-import { useLocalStorage } from '../hooks/useLocalStorage';
-import { UnsentLetter as UnsentLetterType } from '../types';
+import { useSupabaseLetters } from '../hooks/useSupabaseStorage';
+import { useAuth } from '../hooks/useAuth';
+import { AuthModal } from './AuthModal';
 
 export const UnsentLetter: React.FC = () => {
-  const [letters, setLetters] = useLocalStorage<UnsentLetterType[]>('unsent-letters', []);
+  const { user } = useAuth();
+  const { letters, loading, addLetter, updateLetter, deleteLetter } = useSupabaseLetters();
   const [currentLetter, setCurrentLetter] = useState('');
   const [isWriting, setIsWriting] = useState(true);
   const [isBurning, setIsBurning] = useState(false);
   const [showArchive, setShowArchive] = useState(false);
+  const [showAuthModal, setShowAuthModal] = useState(false);
+  const [saving, setSaving] = useState(false);
 
   const handleSubmit = () => {
     if (!currentLetter.trim()) return;
+    if (!user) {
+      setShowAuthModal(true);
+      return;
+    }
 
-    const newLetter: UnsentLetterType = {
-      id: Date.now().toString(),
+    setSaving(true);
+    const newLetter = {
       content: currentLetter,
       date: new Date().toLocaleDateString(),
       burned: false
     };
 
-    setLetters(prev => [newLetter, ...prev]);
     setIsBurning(true);
     
-    setTimeout(() => {
-      setIsBurning(false);
-      setCurrentLetter('');
-      setIsWriting(false);
-    }, 3000);
+    addLetter(newLetter).then(() => {
+      setTimeout(() => {
+        setIsBurning(false);
+        setCurrentLetter('');
+        setIsWriting(false);
+        setSaving(false);
+      }, 3000);
+    });
   };
 
-  const burnLetter = (id: string) => {
-    setLetters(prev => prev.map(letter => 
-      letter.id === id ? { ...letter, burned: true } : letter
-    ));
+  const burnLetter = async (id: string) => {
+    await updateLetter(id, { burned: true });
   };
 
-  const deleteLetter = (id: string) => {
-    setLetters(prev => prev.filter(letter => letter.id !== id));
+  const handleDeleteLetter = async (id: string) => {
+    await deleteLetter(id);
   };
 
+  if (!user) {
+    return (
+      <>
+        <div className="w-full max-w-2xl mx-auto p-6">
+          <div className="text-center mb-8">
+            <h2 className="text-3xl font-bold text-gray-800 mb-4">
+              Write Something You'll Never Send
+            </h2>
+            <p className="text-gray-600 text-lg">
+              Sign in to save your letters and access them from any device
+            </p>
+          </div>
+          
+          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
+            <div className="text-6xl mb-4">✍️</div>
+            <h3 className="text-2xl font-bold text-gray-800 mb-4">
+              Private Letter Writing
+            </h3>
+            <p className="text-gray-600 mb-6">
+              Create an account to write and store your unsent letters securely
+            </p>
+            
+            <button
+              onClick={() => setShowAuthModal(true)}
+              className="px-8 py-4 bg-gradient-to-r from-orange-400 to-red-500 
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
   if (isBurning) {
@@ .. @@
                     <button
                       onClick={() => burnLetter(letter.id)}
                       className="p-2 text-orange-500 hover:bg-orange-50 rounded-full transition-colors"
@@ .. @@
                     )}
                     <button
-                      onClick={() => deleteLetter(letter.id)}
+                      onClick={() => handleDeleteLetter(letter.id)}
                       className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
@@ .. @@
             
             <button
               onClick={handleSubmit}
-              disabled={!currentLetter.trim()}
+              disabled={!currentLetter.trim() || saving}
               className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-red-500 
                        text-white rounded-full font-semibold hover:shadow-lg 
                        transform hover:scale-105 transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
             >
               <Flame size={16} />
-              Burn Letter
+              {saving ? 'Saving...' : 'Burn Letter'}
             </button>
           </div>
@@ .. @@
       <div className="mt-6 text-center text-sm text-gray-500">
-        Your letters are stored locally and privately on your device
+        Your letters are stored securely and privately in your account
       </div>
+      
+      <AuthModal 
+        isOpen={showAuthModal} 
+        onClose={() => setShowAuthModal(false)} 
+      />
     </div>
   );
 };