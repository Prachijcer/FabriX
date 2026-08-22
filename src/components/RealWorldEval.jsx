import React from 'react';
import { PROJECT_METRICS } from '../utils/constants';
import { ShieldCheck, Camera, Layers, CheckCircle } from 'lucide-react';

export default function RealWorldEval() {
  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-r from-indigo-900 via-slate-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl border border-indigo-800/80">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left Info Column */}
            <div className="md:col-span-7">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-extrabold uppercase tracking-wider mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Holdout Validation Benchmark</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-3">
                Real-World Evaluation
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-medium mb-6 leading-relaxed">
                FabricX was subjected to rigorous empirical holdout testing on unseen fabric photographs taken under varying lighting conditions, angles, and camera hardware.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-xs text-indigo-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dataset curated completely independently of training &amp; test sets</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tested across handheld smartphone photos &amp; industrial macro lenses</span>
                </div>
                <div className="flex items-center gap-3 text-xs text-indigo-200">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero data leakage guarantee on the 413 holdout samples</span>
                </div>
              </div>
            </div>

            {/* Right Big Score Card */}
            <div className="md:col-span-5 bg-indigo-950/80 p-8 rounded-2xl border border-indigo-700/60 text-center shadow-xl">
              <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-300 inline-flex items-center justify-center mb-3">
                <Camera className="w-8 h-8" />
              </div>

              <div className="text-5xl sm:text-6xl font-black font-display text-emerald-400 tracking-tight mb-2">
                {PROJECT_METRICS.realWorldAccuracy}%
              </div>

              <div className="text-sm font-bold text-white uppercase tracking-wider mb-1">
                Real-World Accuracy
              </div>

              <p className="text-xs text-slate-400 font-medium">
                Evaluated on {PROJECT_METRICS.realWorldImagesCount} unseen real-world fabric photographs.
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
