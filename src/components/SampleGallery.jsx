import React from 'react';
import { SAMPLE_DATASET } from '../utils/constants';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function SampleGallery({ onSelectSample, selectedSampleId }) {
  return (
    <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 border border-slate-200/80 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Demo Dataset</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 font-display">
            Try FabricX with Sample Images
          </h3>
          <p className="text-xs text-slate-500">
            Click any sample fabric below to load it into the classifier upload dropzone instantly.
          </p>
        </div>
        <div className="text-xs text-slate-400 font-medium">
          6 Representative Textile Samples
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {SAMPLE_DATASET.map((sample) => {
          const isSelected = selectedSampleId === sample.id;
          return (
            <div
              key={sample.id}
              onClick={() => onSelectSample(sample)}
              className={`group cursor-pointer rounded-xl overflow-hidden border transition-all duration-300 bg-white flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 ring-2 ring-indigo-500/20 shadow-lg scale-[1.02]'
                  : 'border-slate-200 hover:border-indigo-300 hover:shadow-md hover:-translate-y-0.5'
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                <img
                  src={sample.imagePath}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-900/75 text-white backdrop-blur-xs">
                  {sample.tag}
                </span>
              </div>

              {/* Details & Button */}
              <div className="p-3 text-center flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-slate-900 font-display">
                    {sample.name}
                  </h4>
                </div>

                <button
                  type="button"
                  className={`mt-2 w-full py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 ${
                    isSelected
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 group-hover:bg-indigo-50 group-hover:text-indigo-700'
                  }`}
                >
                  {isSelected ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Loaded</span>
                    </>
                  ) : (
                    <>
                      <span>Try Sample</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
