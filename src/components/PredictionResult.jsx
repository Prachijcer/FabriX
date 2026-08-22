import React from 'react';
import { FABRIC_CLASSES } from '../utils/constants';
import { CheckCircle2, ShieldCheck, Cpu, Layers, Sparkles, AlertCircle } from 'lucide-react';

export default function PredictionResult({ predictionResult }) {
  if (!predictionResult) return null;

  const { predictedClass, confidence, modelName, statusTier, probabilities } = predictionResult;

  // Find class styling detail
  const classDetail = FABRIC_CLASSES.find(
    c => c.name.toLowerCase() === predictedClass.toLowerCase()
  ) || FABRIC_CLASSES[0];

  // SVG Circular progress bar setup
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-indigo-100 shadow-xl shadow-indigo-500/10 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Analysis Complete</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 font-display">
            Predicted Fabric
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-xl border border-slate-200/70">
          <Cpu className="w-4 h-4 text-indigo-600" />
          <div className="text-xs">
            <span className="text-slate-400 block font-medium">Model</span>
            <span className="font-bold text-slate-800">{modelName}</span>
          </div>
        </div>
      </div>

      {/* Main Result Showcase */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 my-6 items-center">
        
        {/* Circular Progress & Classification Badge */}
        <div className="md:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-indigo-50/60 to-slate-50 border border-indigo-100/80 text-center">
          
          {/* Circular Confidence Meter */}
          <div className="relative w-36 h-36 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Track */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-slate-200 stroke-current"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Animated Value Ring */}
              <circle
                cx="50"
                cy="50"
                r={radius}
                className="text-indigo-600 stroke-current transition-all duration-1000 ease-out"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Score Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold font-display text-slate-900 tracking-tight">
                {confidence}%
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                CONFIDENCE
              </span>
            </div>
          </div>

          {/* Predicted Fabric Title */}
          <div className="mb-2">
            <span className="text-3xl font-black text-indigo-950 font-display tracking-tight">
              {predictedClass}
            </span>
          </div>

          <p className="text-xs text-slate-600 max-w-xs mb-3 font-medium">
            {classDetail.description}
          </p>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100/70 text-indigo-900 text-xs font-bold">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            <span>{statusTier}</span>
          </div>

        </div>

        {/* Probability Distribution Chart */}
        <div className="md:col-span-7 flex flex-col justify-center">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
              Probability Distribution across 6 Classes
            </h4>
            <span className="text-xs text-slate-400 font-medium">6 Classes</span>
          </div>

          <div className="space-y-3">
            {FABRIC_CLASSES.map((cls) => {
              const probVal = probabilities[cls.name] ?? 0;
              const isMatch = cls.name.toLowerCase() === predictedClass.toLowerCase();

              return (
                <div key={cls.id} className="space-y-1">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className={isMatch ? 'text-indigo-950 font-extrabold flex items-center gap-1.5' : 'text-slate-600'}>
                      {cls.name}
                      {isMatch && <span className="text-[10px] bg-indigo-600 text-white font-bold px-1.5 py-0.2 rounded">Predicted</span>}
                    </span>
                    <span className={isMatch ? 'text-indigo-600 font-extrabold' : 'text-slate-500'}>
                      {probVal}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/50">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${
                        isMatch
                          ? 'bg-gradient-to-r from-indigo-500 to-violet-600 shadow-sm'
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${Math.max(probVal, 2)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Metadata Footnote */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span>Classifier: <strong>FabricX Ensemble</strong></span>
          <span>Target Standard: <strong>6 Classes</strong></span>
        </div>
        <span>Processed via Flask API (`POST /api/predict`)</span>
      </div>

    </div>
  );
}
