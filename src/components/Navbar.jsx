import React from 'react';
import { Cpu, RefreshCw, Layers, CheckCircle2, AlertTriangle } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, backendStatus, onRetryBackend }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'classifier', label: 'Classifier' },
    { id: 'models', label: 'Models' },
    { id: 'performance', label: 'Performance' },
    { id: 'about', label: 'About' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-indigo-500 flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
              <span className="text-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-300">🧵</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900">FabricX</span>
                <span className="text-xs bg-indigo-50 text-indigo-700 font-bold px-1.5 py-0.5 rounded border border-indigo-100">v1.0</span>
              </div>
              <p className="text-[10px] font-bold tracking-wider text-amber-600 uppercase">
                INTELLIGENT FABRIC CLASSIFIER
              </p>
            </div>
          </div>

          {/* Navigation Items (Matching reference screenshot pill tabs) */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100/70 p-1.5 rounded-full border border-slate-200/50">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-100 text-purple-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Status Badge / Action Button */}
          <div className="flex items-center gap-3">
            {backendStatus.online ? (
              <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold shadow-xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span>Flask API Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Backend Offline</span>
                </div>
                <button 
                  onClick={onRetryBackend}
                  title="Retry connecting to Flask backend at http://127.0.0.1:5000"
                  className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-hover" />
                </button>
              </div>
            )}

            <button
              onClick={() => {
                setActiveTab('classifier');
                const el = document.getElementById('classifier');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 transition-all duration-300 flex items-center gap-1.5"
            >
              <span>LET'S PREDICT</span>
              <span>→</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
