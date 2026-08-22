import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Navbar({ activePage, setActivePage }) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'models', label: 'Models' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo matching screenshot */}
        <button 
          onClick={() => setActivePage('home')} 
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          {/* Spool Icon SVG */}
          <div className="w-10 h-10 rounded-xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-105 transition-transform">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 2h10v3H7V2zm1 4h8v2H8V6zm-1 3h10v6H7V9zm1 7h8v2H8v-2zm-1 3h10v3H7v-3z" />
            </svg>
          </div>

          <div>
            <span className="text-2xl font-black tracking-tight text-purple-950 font-serif">
              Fabric<span className="text-purple-600">X</span>
            </span>
            <p className="text-[10px] font-extrabold tracking-wider uppercase text-orange-500 font-sans">
              INTELLIGENT FABRIC CLASSIFIER
            </p>
          </div>
        </button>

        {/* Navigation items: Home, About, How It Works, Models */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-100 text-purple-700 font-bold shadow-xs'
                    : 'text-slate-600 hover:text-purple-900 hover:bg-slate-50'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button: LET'S PREDICT → */}
        <div>
          <button
            onClick={() => setActivePage('classifier')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <span>LET'S PREDICT</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Mobile Sub-Nav */}
      <div className="md:hidden flex items-center justify-around bg-slate-50 border-t border-slate-100 py-2 px-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              activePage === item.id ? 'bg-purple-100 text-purple-700 font-bold' : 'text-slate-600'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
