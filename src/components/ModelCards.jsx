import React from 'react';
import { MODELS_DATA } from '../utils/constants';
import { Cpu, Star, CheckCircle, ShieldCheck, Zap } from 'lucide-react';

export default function ModelCards() {
  return (
    <section id="models" className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture Benchmarks</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            AI Models &amp; Architectures
          </h2>
          <p className="text-base text-slate-600 font-medium">
            FabricX benchmarks deep convolutional neural networks alongside classical machine learning models.
          </p>
        </div>

        {/* Models Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {MODELS_DATA.map((model) => {
            const isRecommended = model.isRecommended;

            return (
              <div
                key={model.id}
                className={`relative rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between ${
                  isRecommended
                    ? 'bg-gradient-to-b from-indigo-900 via-slate-900 to-indigo-950 text-white shadow-2xl shadow-indigo-900/30 ring-2 ring-indigo-500 scale-[1.02]'
                    : 'bg-slate-50 hover:bg-white text-slate-900 border border-slate-200/80 shadow-md hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Highlight Badge for Ensemble */}
                {isRecommended && (
                  <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-orange-500 text-slate-950 font-black text-[11px] uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Recommended System</span>
                  </div>
                )}

                <div>
                  {/* Model Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-2xl ${
                      isRecommended ? 'bg-indigo-800/60 text-indigo-300' : 'bg-indigo-100 text-indigo-700'
                    }`}>
                      {isRecommended ? <Zap className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                    </div>
                    
                    {/* Accuracy Tag */}
                    <div className="text-right">
                      <span className={`text-2xl font-black font-display ${
                        isRecommended ? 'text-amber-400' : 'text-indigo-600'
                      }`}>
                        {model.accuracy}%
                      </span>
                      <span className={`block text-[10px] uppercase font-bold tracking-wider ${
                        isRecommended ? 'text-slate-300' : 'text-slate-400'
                      }`}>
                        ACCURACY
                      </span>
                    </div>
                  </div>

                  {/* Title & Architecture */}
                  <h3 className={`text-xl font-bold font-display mb-1 ${
                    isRecommended ? 'text-white' : 'text-slate-900'
                  }`}>
                    {model.name}
                  </h3>

                  <p className={`text-xs font-semibold mb-4 ${
                    isRecommended ? 'text-indigo-200' : 'text-indigo-600'
                  }`}>
                    {model.architecture}
                  </p>

                  <p className={`text-xs leading-relaxed mb-6 font-medium ${
                    isRecommended ? 'text-slate-300' : 'text-slate-600'
                  }`}>
                    {model.description}
                  </p>
                </div>

                {/* Additional Metrics Footer */}
                <div className={`pt-4 border-t text-xs font-medium space-y-1.5 ${
                  isRecommended ? 'border-indigo-800/80 text-slate-300' : 'border-slate-200 text-slate-500'
                }`}>
                  <div className="flex justify-between">
                    <span>Precision</span>
                    <span className="font-bold">{model.precision}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Recall</span>
                    <span className="font-bold">{model.recall}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weighted F1</span>
                    <span className="font-bold">{model.weightedF1}%</span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
