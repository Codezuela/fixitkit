@@ .. @@
 import React, { useState } from 'react';
+import { useAuth } from './hooks/useAuth';
 import { Header } from './components/Header';
@@ .. @@
 function App() {
+  const { loading } = useAuth();
   const [currentView, setCurrentView] = useState('home');
@@ .. @@
   };
 
+  if (loading) {
+    return (
+      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 
+                    flex items-center justify-center">
+        <div className="text-center">
+          <div className="text-6xl mb-4">💖</div>
+          <h2 className="text-2xl font-bold text-gray-800 mb-2">Loading FixItKit</h2>
+          <div className="w-8 h-8 border-4 border-purple-200 border-t-purple-500 rounded-full animate-spin mx-auto"></div>
+        </div>
+      </div>
+    );
+  }
+
   return (
     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
       <Header onShowInfo={() => setShowInfo(true)} />
@@ .. @@
 export default App;