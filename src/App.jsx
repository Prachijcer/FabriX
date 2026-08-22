import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Classifier from './components/Classifier';
import ModelCards from './components/ModelCards';
import PerformanceChart from './components/PerformanceChart';
import ClassPerformance from './components/ClassPerformance';
import RealWorldEval from './components/RealWorldEval';
import HowItWorks from './components/HowItWorks';
import About from './components/About';
import Footer from './components/Footer';
import { checkBackendHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [backendStatus, setBackendStatus] = useState({ online: false, checking: true });

  // Health check on component mount and period polling
  const verifyBackend = async () => {
    setBackendStatus(prev => ({ ...prev, checking: true }));
    const health = await checkBackendHealth();
    setBackendStatus({ online: health.online, checking: false });
  };

  useEffect(() => {
    verifyBackend();
    const interval = setInterval(verifyBackend, 15000); // Check every 15 sec
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      {/* Header / Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        backendStatus={backendStatus}
        onRetryBackend={verifyBackend}
      />

      {/* Main Content Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero
          onStartClassification={() => scrollToSection('classifier')}
          onViewPerformance={() => scrollToSection('performance')}
        />

        {/* Classifier Upload & Interactive Sample Demo Section */}
        <Classifier
          backendStatus={backendStatus}
          onRetryBackend={verifyBackend}
        />

        {/* How It Works Pipeline */}
        <HowItWorks />

        {/* AI Models & Architecture Cards */}
        <ModelCards />

        {/* Model Performance Charts & Metrics */}
        <PerformanceChart />

        {/* Per-Class F1 Performance Breakdown */}
        <ClassPerformance />

        {/* Real-World Holdout Validation */}
        <RealWorldEval />

        {/* About Project & Fabric Classes Chips */}
        <About />

      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
