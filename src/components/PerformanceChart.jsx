import React from 'react';
import { MODELS_DATA, PROJECT_METRICS } from '../utils/constants';
import { BarChart2, ShieldCheck, Target, Activity, Award } from 'lucide-react';

export default function PerformanceChart() {
  return (
    <section id="performance" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-3">
            <BarChart2 className="w-3.5 h-3.5" />
            <span>Evaluation Metrics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            Model Performance
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Comparative classification performance across four distinct machine learning architectures.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Accuracy Comparison Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 font-display">
                  Overall Accuracy Comparison
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tested on 716 multi-class fabric test images
                </p>
              </div>
              <span className="text-xs font-bold bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full border border-indigo-100">
                Top Model: 85.89%
              </span>
            </div>

            {/* Custom SVG / HTML Bar Chart */}
            <div className="space-y-6">
              {MODELS_DATA.map((model) => {
                const isRecommended = model.isRecommended;

                return (
                  <div key={model.id} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className={`font-bold ${isRecommended ? 'text-indigo-950 flex items-center gap-2' : 'text-slate-700'}`}>
                        {model.name}
                        {isRecommended && (
                          <span className="text-[10px] uppercase font-black bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                            Ensemble Recommended
                          </span>
                        )}
                      </span>
                      <span className={`font-black font-display ${isRecommended ? 'text-indigo-600 text-base' : 'text-slate-600'}`}>
                        {model.accuracy}%
                      </span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ease-out ${
                          isRecommended
                            ? 'bg-gradient-to-r from-indigo-600 to-violet-600 shadow-md'
                            : 'bg-slate-400'
                        }`}
                        style={{ width: `${model.accuracy}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-xs text-slate-500 font-medium">
              Note: The FabricX Ensemble leverages cross-model confidence averaging to achieve an optimal balance between precision and recall.
            </div>
          </div>

          {/* FabricX Ensemble Metric Breakdown Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-indigo-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-800/80">
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-amber-400/20 text-amber-400 border border-amber-400/30">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold font-display text-white">
                  FabricX Ensemble
                </h3>
                <p className="text-xs text-indigo-200 font-medium">
                  Primary Classification Engine Metrics
                </p>
              </div>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-2 gap-4">
              
              <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-800/60">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 block mb-1">
                  Macro Precision
                </span>
                <span className="text-2xl font-black font-display text-white">
                  {PROJECT_METRICS.macroPrecision}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Positive Predictive Value</span>
              </div>

              <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-800/60">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 block mb-1">
                  Macro Recall
                </span>
                <span className="text-2xl font-black font-display text-emerald-400">
                  {PROJECT_METRICS.macroRecall}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Sensitivity / TPR</span>
              </div>

              <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-800/60">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 block mb-1">
                  Macro F1
                </span>
                <span className="text-2xl font-black font-display text-amber-300">
                  {PROJECT_METRICS.macroF1}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Unweighted Harmonic Mean</span>
              </div>

              <div className="bg-indigo-950/60 p-4 rounded-2xl border border-indigo-800/60">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-300 block mb-1">
                  Weighted F1
                </span>
                <span className="text-2xl font-black font-display text-indigo-300">
                  {PROJECT_METRICS.weightedF1}%
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">Class-Balanced Harmonic Mean</span>
              </div>

            </div>

            <div className="mt-6 p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed font-medium">
              <span className="font-bold text-white">Summary:</span> FabricX Ensemble achieves high multi-class precision (81.19%) and strong recall (86.49%), proving robust generalization across varied textile weave patterns.
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
