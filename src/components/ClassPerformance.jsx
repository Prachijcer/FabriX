import React from 'react';
import { FABRIC_CLASSES } from '../utils/constants';
import { Layers, Award, AlertTriangle, Sparkles, TrendingUp } from 'lucide-react';

export default function ClassPerformance() {
  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Category Breakdown</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            Per-Class F1 Score Performance
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Granular evaluation showing individual classification accuracy across all six target fabric materials.
          </p>
        </div>

        {/* 6 Fabric Class Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {FABRIC_CLASSES.map((cls) => {
            const isBest = cls.isBest;
            const isChallenging = cls.isChallenging;

            return (
              <div
                key={cls.id}
                className={`relative rounded-3xl p-6 border transition-all duration-300 ${
                  isBest
                    ? 'bg-indigo-50/70 border-indigo-300 ring-2 ring-indigo-500/20 shadow-lg'
                    : isChallenging
                    ? 'bg-rose-50/60 border-rose-200 shadow-md'
                    : 'bg-slate-50 border-slate-200/80 hover:bg-white hover:shadow-lg'
                }`}
              >
                {/* Badge for Best or Challenging Class */}
                {isBest && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-600 text-white font-extrabold text-[10px] uppercase tracking-wider mb-3">
                    <Award className="w-3 h-3 text-amber-300" />
                    <span>Strongest F1 Performance</span>
                  </div>
                )}
                {isChallenging && (
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] uppercase tracking-wider mb-3">
                    <AlertTriangle className="w-3 h-3 text-white" />
                    <span>Most Challenging Class</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold font-display text-slate-900">
                    {cls.name}
                  </h3>

                  <div className="text-right">
                    <span className={`text-2xl font-black font-display ${
                      isBest ? 'text-indigo-600' : isChallenging ? 'text-rose-600' : 'text-slate-800'
                    }`}>
                      {cls.f1}%
                    </span>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase">
                      F1 SCORE
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-3 w-full bg-white rounded-full overflow-hidden p-0.5 border border-slate-200/80 mb-4">
                  <div
                    className={`h-full rounded-full ${
                      isBest
                        ? 'bg-gradient-to-r from-indigo-500 to-indigo-700'
                        : isChallenging
                        ? 'bg-rose-500'
                        : 'bg-slate-700'
                    }`}
                    style={{ width: `${cls.f1}%` }}
                  />
                </div>

                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  {cls.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Analytical Insight Note */}
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-2xl bg-indigo-600/30 text-indigo-400 border border-indigo-500/30 shrink-0">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-display text-white mb-1">
                Class-Level Performance Insights
              </h4>
              <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
                <strong>Denim</strong> achieves the highest class-level F1 score (<strong>91.21%</strong>) due to its distinct diagonal twill weave pattern and consistent indigo dye histograms. In contrast, <strong>Wool</strong> (<strong>74.07%</strong>) presents the most challenging classification boundary because of irregular yarn surface fluffiness and specular light scattering.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
