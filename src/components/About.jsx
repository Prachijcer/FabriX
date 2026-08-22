import React from 'react';
import { FABRIC_CLASSES } from '../utils/constants';
import { Info, Sparkles, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-xl">
          
          <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full w-fit mb-4 border border-indigo-100">
            <Info className="w-3.5 h-3.5" />
            <span>About the Project</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-4">
            About FabricX System
          </h2>

          <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-4xl">
            FabricX is an AI-powered fabric classification system designed to identify textile materials from images. The system combines deep learning and traditional machine learning techniques to classify fabrics into six categories.
          </p>

          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">
            Supported Target Fabric Material Classes:
          </h3>

          {/* 6 Chips */}
          <div className="flex flex-wrap gap-3 mb-8">
            {FABRIC_CLASSES.map((cls) => (
              <div
                key={cls.id}
                className="px-4 py-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 text-slate-800 text-sm font-bold flex items-center gap-2 shadow-xs hover:border-indigo-300 transition-colors"
              >
                <div className={`w-3 h-3 rounded-full ${cls.color}`} />
                <span>{cls.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Hybrid Deep Learning &amp; Machine Learning</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Restful Flask API Backend Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Graduation Engineering Project Standard</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
