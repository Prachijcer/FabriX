import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import HowItWorksPage from './pages/HowItWorksPage';
import ModelsPage from './pages/ModelsPage';
import ClassifierPage from './pages/ClassifierPage';

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [selectedSample, setSelectedSample] = useState(null);

  const handleSelectSample = (sample) => {
    setSelectedSample(sample);
    setActivePage('classifier');
  };

  const handleClearSample = () => {
    setSelectedSample(null);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 text-slate-900 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Navbar with logo, Home, About, How It Works, Models, LET'S PREDICT -> button */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Page View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomePage setActivePage={setActivePage} onSelectSample={handleSelectSample} />
        )}
        {activePage === 'about' && (
          <AboutPage />
        )}
        {activePage === 'how-it-works' && (
          <HowItWorksPage setActivePage={setActivePage} />
        )}
        {activePage === 'models' && (
          <ModelsPage />
        )}
        {activePage === 'classifier' && (
          <ClassifierPage selectedSample={selectedSample} onClearSample={handleClearSample} />
        )}
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />

    </div>
  );
}
