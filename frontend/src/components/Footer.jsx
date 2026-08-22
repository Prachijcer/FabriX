import React from 'react';

export default function Footer({ setActivePage }) {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 py-8 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-lg font-black text-purple-950 font-serif">
            Fabric<span className="text-purple-600">X</span>
          </span>
          <span className="text-slate-400">|</span>
          <p className="text-slate-500">Intelligent Fabric Classification Using Machine Learning</p>
        </div>

        <div className="flex items-center gap-4 text-slate-600 font-medium">
          <button onClick={() => setActivePage('home')} className="hover:text-purple-700">Home</button>
          <button onClick={() => setActivePage('about')} className="hover:text-purple-700">About</button>
          <button onClick={() => setActivePage('how-it-works')} className="hover:text-purple-700">How It Works</button>
          <button onClick={() => setActivePage('models')} className="hover:text-purple-700">Models</button>
        </div>
      </div>
    </footer>
  );
}
