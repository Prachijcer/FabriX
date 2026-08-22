import React from 'react';
import { AppWindow, Factory, ShoppingCart, Recycle, ShieldCheck, ArrowRight } from 'lucide-react';

export default function ApplicationsPage({ setActivePage }) {
  const apps = [
    {
      title: 'Textile Manufacturing Quality Control',
      icon: Factory,
      color: 'from-blue-600 to-indigo-600',
      desc: 'Automated inline optical inspection to ensure batch consistency and detect fabric type mix-ups on high-speed industrial weaving looms.'
    },
    {
      title: 'E-Commerce Cataloging & Auto-Tagging',
      icon: ShoppingCart,
      color: 'from-purple-600 to-pink-600',
      desc: 'Instant fabric material identification for online fashion platforms to auto-fill material composition metadata and wash care labels.'
    },
    {
      title: 'Sustainable Garment Recycling & Sorting',
      icon: Recycle,
      color: 'from-emerald-600 to-teal-600',
      desc: 'Automated sorting of discarded garments by fiber composition (cotton vs polyester vs wool blends) to feed circular economy recycling facilities.'
    },
    {
      title: 'Supply Chain & Material Verification',
      icon: ShieldCheck,
      color: 'from-amber-600 to-orange-600',
      desc: 'Handheld or mobile optical audit tools for customs inspectors, fashion buyers, and luxury retail verifiers to detect counterfeit fabric claims.'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16 px-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
          <AppWindow className="w-3.5 h-3.5" /> Industrial Use Cases
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Applications of FabricX</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          From high-speed textile quality control to circular garment recycling, FabricX offers versatile AI material intelligence across industries.
        </p>
      </div>

      {/* Grid of 4 Use Cases */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {apps.map((a) => {
          const Icon = a.icon;
          return (
            <div key={a.title} className="glass-panel p-8 rounded-3xl border border-slate-800 space-y-4 hover:border-blue-500/40 transition-all duration-300">
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${a.color} flex items-center justify-center text-white shadow-lg`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white">{a.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed">{a.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="glass-panel rounded-3xl p-8 border border-blue-500/30 bg-blue-950/20 text-center space-y-4">
        <h3 className="text-2xl font-extrabold text-white">Test FabricX with Your Custom Images</h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Experience instant AI classification across Cotton, Denim, Linen, Polyester, Silk, and Wool.
        </p>
        <button
          onClick={() => setActivePage('classifier')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 transition-all"
        >
          <span>Launch Classifier</span> <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
