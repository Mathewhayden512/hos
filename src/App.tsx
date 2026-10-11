import React, { useEffect } from 'react';
import { HomePage } from './pages/HomePage';

export function App() {
  // If user opens a direct section link like #day1 or #package, smoothly scroll to it on load
  useEffect(() => {
    const handleInitialHash = () => {
      const rawHash = window.location.hash;
      const targetId = rawHash.replace(/^[#/]+/, '');
      if (targetId) {
        setTimeout(() => {
          const el = document.getElementById(targetId);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 350);
      }
    };

    handleInitialHash();
    window.addEventListener('hashchange', handleInitialHash);
    return () => window.removeEventListener('hashchange', handleInitialHash);
  }, []);

  return (
    <div className="min-h-screen bg-[#06130c] text-mist-100 font-sans selection:bg-[#2d6a4f] selection:text-white">
      <HomePage />
    </div>
  );
}

export default App;
