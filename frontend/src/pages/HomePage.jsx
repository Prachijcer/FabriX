import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function HomePage({ setActivePage }) {
  const supportedClasses = [
    { name: 'Cotton', desc: 'Soft and breathable natural fabric.', color: 'from-amber-500/10 to-orange-500/10 border-amber-200 text-amber-900' },
    { name: 'Denim', desc: 'Strong woven cotton fabric commonly used for jeans.', color: 'from-blue-600/10 to-indigo-600/10 border-blue-200 text-blue-900' },
    { name: 'Linen', desc: 'Natural fabric known for its lightweight and textured appearance.', color: 'from-yellow-600/10 to-amber-600/10 border-yellow-200 text-yellow-900' },
    { name: 'Silk', desc: 'Natural protein-based fabric with a smooth and lustrous appearance.', color: 'from-purple-500/10 to-pink-500/10 border-purple-200 text-purple-900' },
    { name: 'Wool', desc: 'Natural animal fiber with a warm and characteristic textured surface.', color: 'from-stone-500/10 to-neutral-500/10 border-stone-200 text-stone-900' }
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Section with Horizontal Fabric Background */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden py-16 px-4">
        
        <div className="absolute inset-0 z-0">
          <img 
            src="/hero_bg_horizontal.jpg" 
            alt="Fabric Swatches Background" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-slate-900/10" />
        </div>

        {/* Central Hero White/Glass Card with Frosted Glass Transparency */}
        <div className="relative z-10 max-w-2xl w-full bg-white/65 backdrop-blur-xl rounded-3xl p-8 sm:p-12 text-center shadow-2xl border border-white/80 space-y-6 shadow-purple-900/10">
          
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-orange-500 font-sans block">
            SMART CLASSIFIER
          </span>



          <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-purple-950 font-serif">
            Fabric<span className="text-purple-600">X</span>
          </h1>

          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 font-serif leading-snug">
            Intelligent Fabric Classification<br className="hidden sm:inline" /> Using Machine Learning
          </h2>

          <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
            Upload a fabric image and let FabricX Classifier identify its fabric type using three machine learning models.
          </p>

          <div className="pt-2">
            <button
              onClick={() => setActivePage('classifier')}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all duration-200"
            >
              <span>LET'S PREDICT</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 5 Supported Fabric Classes */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-600">Classification Capabilities</span>
          <h2 className="text-3xl font-extrabold text-slate-900 font-serif">Supported Fabric Categories</h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto">
            FabricX classifies material images into five standardized categories with high accuracy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {supportedClasses.map((cls, idx) => (
            <div key={cls.name} className={`p-5 rounded-2xl border bg-gradient-to-br ${cls.color} space-y-3 shadow-xs hover:shadow-md transition-all`}>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold font-serif">{cls.name}</h3>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center font-bold text-xs font-mono shadow-xs">
                  0{idx + 1}
                </span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed font-sans">{cls.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
