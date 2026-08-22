import React from 'react';
import { Cpu, Github, ExternalLink } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  const footerLinks = [
    { id: 'home', label: 'Home' },
    { id: 'classifier', label: 'Classifier' },
    { id: 'models', label: 'Models' },
    { id: 'performance', label: 'Performance' },
  ];

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-xl shadow-md">
              🧵
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-black text-xl text-white">FabricX</span>
                <span className="text-[10px] bg-indigo-900 text-indigo-300 px-1.5 py-0.5 rounded font-bold">
                  v1.0
                </span>
              </div>
              <p className="text-xs text-slate-400">
                AI-powered fabric classification system
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-semibold">
            {footerLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  const el = document.getElementById(link.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} FabricX System. Final-Year Engineering Project &amp; Demo.</p>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-medium">
            <span>Built with Machine Learning + Flask + React</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
