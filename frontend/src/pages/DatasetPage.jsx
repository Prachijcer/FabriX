import React from 'react';
import { Database, ShieldCheck, CheckCircle2, ArrowRight, Layers, FolderTree, FileCheck, HardDrive } from 'lucide-react';

export default function DatasetPage() {
  const verifiedNumbers = [
    { label: 'Physical Sample Groups', val: '1,403', highlight: false },
    { label: 'Genuine Images', val: '4,760', highlight: true },
    { label: 'Training Set', val: '3,348', highlight: false },
    { label: 'Validation Set', val: '696', highlight: false },
    { label: 'Untouched Test Set', val: '716', highlight: false },
  ];

  const auditStats = [
    { check: 'Train/Test Duplicate Files', result: '0', status: 'Passed' },
    { check: 'Train/Validation Duplicate Files', result: '0', status: 'Passed' },
    { check: 'Validation/Test Duplicate Files', result: '0', status: 'Passed' },
    { check: 'Shared Sample Groups Across Splits', result: '0', status: 'Passed' },
  ];

  const pipelineSteps = [
    { step: '01', title: 'Images', desc: 'Labeled macro fabric images organized into 6 classes.' },
    { step: '02', title: 'Cleaning', desc: 'De-duplication, artifact filter & quality validation.' },
    { step: '03', title: 'Preprocessing', desc: 'Standardized 224x224 cropping & channel normalization.' },
    { step: '04', title: 'Feature Extraction', desc: 'GLCM, LBP, Gabor & HSV feature vector calculation.' },
    { step: '05', title: 'Training', desc: 'Model weight training on 3,348 training split images.' },
    { step: '06', title: 'Validation', desc: 'Hyperparameter tuning on 696 validation split images.' },
    { step: '07', title: 'Untouched Test Set', desc: 'Evaluation on 716 strictly isolated test images.' },
  ];

  const classes = ['Cotton', 'Denim', 'Linen', 'Polyester', 'Silk', 'Wool'];

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16 px-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
          <Database className="w-3.5 h-3.5" /> Benchmark Dataset & Integrity
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">FabricX Dataset</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          "The FabricX classification system uses labeled fabric images organized into six fabric categories."
        </p>
      </div>

      {/* Verified Project Numbers Display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {verifiedNumbers.map((item) => (
          <div key={item.label} className={`glass-card p-5 rounded-2xl border ${item.highlight ? 'border-blue-500/50 bg-blue-600/10' : 'border-slate-800'} space-y-1`}>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">{item.label}</span>
            <p className={`text-3xl font-extrabold font-mono ${item.highlight ? 'text-blue-400' : 'text-white'}`}>{item.val}</p>
          </div>
        ))}
      </div>

      {/* Supported 6 Classes Badge Cards */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
        <h3 className="text-lg font-bold text-white">Target Fabric Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {classes.map((c) => (
            <div key={c} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-center font-bold text-sm text-slate-200">
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Dataset Flow Diagram */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Data Engineering Pipeline</span>
          <h3 className="text-2xl font-extrabold text-white">Dataset Flow</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {pipelineSteps.map((p, idx) => (
            <div key={p.step} className="glass-card p-4 rounded-xl border border-slate-800/80 space-y-2 relative">
              <span className="text-xs font-mono font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                {p.step}
              </span>
              <h4 className="text-xs font-bold text-white mt-1">{p.title}</h4>
              <p className="text-[11px] text-slate-400 leading-tight">{p.desc}</p>
              {idx < pipelineSteps.length - 1 && (
                <span className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-slate-600 text-xs font-mono z-10">
                  →
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Data Leakage Audit Section */}
      <section className="glass-panel rounded-3xl p-8 border border-emerald-500/30 bg-emerald-950/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-500/20 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Data Leakage Audit</h3>
              <p className="text-xs text-slate-300">Verified zero cross-split file contamination or sample group overlap.</p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold font-mono">
            STATUS: VERIFIED CLEAN
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {auditStats.map((item) => (
            <div key={item.check} className="glass-card p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-slate-300">{item.check}</p>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Audit {item.status}
                </span>
              </div>
              <span className="text-2xl font-black font-mono text-emerald-400 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                {item.result}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Shutterstock Data Licensing Compliance & Structure */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <FolderTree className="w-6 h-6 text-blue-400" />
          <h3 className="text-xl font-bold text-white">Shutterstock Data Licensing & Directory Layout</h3>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          The machine-learning training dataset is structured in full compliance with Shutterstock Data Licensing standards. Ordinary web search results are not scraped or represented as training data. Sample gallery assets are maintained in a separate public directory.
        </p>

        <div className="glass-card p-5 rounded-2xl border border-slate-800 font-mono text-xs text-slate-300 space-y-1">
          <p className="text-blue-400 font-bold">dataset/</p>
          <p className="pl-4 text-slate-300">├── cotton/</p>
          <p className="pl-4 text-slate-300">├── denim/</p>
          <p className="pl-4 text-slate-300">├── linen/</p>
          <p className="pl-4 text-slate-300">├── polyester/</p>
          <p className="pl-4 text-slate-300">├── silk/</p>
          <p className="pl-4 text-slate-300">└── wool/</p>
        </div>
      </section>

    </div>
  );
}
