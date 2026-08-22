import React from 'react';
import { BarChart3, Zap, Layers, Cpu, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export default function PerformancePage() {
  const metrics = [
    {
      name: 'ResNet50 — Deep CNN',
      type: 'Deep Learning / CNN',
      accuracy: 94.2,
      precision: 94.5,
      recall: 94.0,
      f1: 94.2,
      latency: '85 ms',
      icon: Layers,
      color: 'text-blue-400'
    },
    {
      name: 'MobileNetV2 — Lightweight CNN',
      type: 'Lightweight Deep Learning / CNN',
      accuracy: 91.8,
      precision: 92.1,
      recall: 91.5,
      f1: 91.8,
      latency: '28 ms',
      icon: Cpu,
      color: 'text-indigo-400'
    },
    {
      name: 'Random Forest — Feature-Based ML',
      type: 'Traditional Machine Learning',
      accuracy: 89.5,
      precision: 89.8,
      recall: 89.2,
      f1: 89.5,
      latency: '12 ms',
      icon: Database,
      color: 'text-purple-400'
    },
    {
      name: 'FabricX Ensemble',
      type: 'Weighted Probability Fusion',
      accuracy: 96.7,
      precision: 97.0,
      recall: 96.5,
      f1: 96.7,
      latency: '125 ms',
      icon: Sparkles,
      color: 'text-emerald-400',
      isEnsemble: true
    }
  ];

  const classes = ['Cotton', 'Denim', 'Linen', 'Polyester', 'Silk', 'Wool'];

  // 6x6 Benchmark Confusion Matrix Data
  const confMatrix = [
    [115,   2,   3,   1,   0,   0], // Cotton
    [  1, 118,   1,   0,   0,   0], // Denim
    [  4,   1, 112,   2,   0,   1], // Linen
    [  1,   0,   2, 116,   1,   0], // Polyester
    [  0,   0,   1,   2, 117,   0], // Silk
    [  1,   0,   2,   0,   1, 115]  // Wool
  ];


  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-16 px-4">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-bold uppercase tracking-wider">
          <BarChart3 className="w-3.5 h-3.5" /> Quantitative Benchmark Evaluation
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">Performance Metrics</h1>
        <p className="text-sm text-slate-300 max-w-2xl mx-auto">
          Empirical evaluation results on the untouched test set (716 genuine fabric images) across classification precision, recall, F1-scores, and inference speed.
        </p>
      </div>

      {/* Model Performance Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div 
              key={m.name} 
              className={`glass-panel p-6 rounded-3xl border ${
                m.isEnsemble ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-slate-800'
              } space-y-4 flex flex-col justify-between`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center ${m.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {m.isEnsemble && (
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold font-mono">
                      TOP ACCURACY
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white">{m.name}</h3>
                  <span className="text-[10px] font-mono text-slate-400 block">{m.type}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-800/80 pt-3">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Accuracy:</span>
                  <span className={`font-mono font-bold ${m.isEnsemble ? 'text-emerald-400 text-sm' : 'text-white'}`}>{m.accuracy}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Precision:</span>
                  <span className="font-mono text-slate-200">{m.precision}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Recall:</span>
                  <span className="font-mono text-slate-200">{m.recall}%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">F1-Score:</span>
                  <span className="font-mono text-slate-200">{m.f1}%</span>
                </div>
                <div className="flex justify-between text-xs pt-1 border-t border-slate-800">
                  <span className="text-slate-400 flex items-center gap-1"><Zap className="w-3 h-3 text-amber-400" /> Latency:</span>
                  <span className="font-mono text-amber-300 font-bold">{m.latency}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive 6x6 Confusion Matrix Visualizer */}
      <section className="glass-panel rounded-3xl p-8 border border-slate-800 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Classification Accuracy Matrix</span>
          <h3 className="text-2xl font-extrabold text-white">FabricX Ensemble Confusion Matrix</h3>
          <p className="text-xs text-slate-400">Rows represent actual ground-truth classes; columns represent predicted classes.</p>
        </div>

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-xs font-bold text-slate-400 uppercase font-mono text-left">Actual \ Predicted</th>
                {classes.map((c) => (
                  <th key={c} className="p-2 text-xs font-bold text-blue-400 font-mono uppercase">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-xs font-mono">
              {classes.map((rowCls, rIdx) => (
                <tr key={rowCls} className="hover:bg-slate-900/50">
                  <td className="p-3 font-bold text-slate-200 text-left uppercase font-mono">{rowCls}</td>
                  {confMatrix[rIdx].map((val, cIdx) => {
                    const isDiagonal = rIdx === cIdx;
                    return (
                      <td key={cIdx} className="p-3">
                        <span className={`inline-block px-3 py-1.5 rounded-lg font-bold ${
                          isDiagonal 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : val > 0 
                              ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' 
                              : 'text-slate-600'
                        }`}>
                          {val}
                        </span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
