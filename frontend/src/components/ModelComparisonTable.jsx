import React from 'react';
import { Layers, Cpu, Database, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ModelComparisonTable({ modelsData }) {
  if (!modelsData || Object.keys(modelsData).length === 0) {
    return (
      <div className="bg-amber-50 rounded-2xl p-6 text-center border border-amber-200">
        <AlertCircle className="w-8 h-8 text-amber-600 mx-auto mb-2" />
        <p className="text-amber-900 font-semibold text-sm">Individual model information unavailable from backend</p>
        <p className="text-amber-700 text-xs mt-1">Showing ensemble summary only.</p>
      </div>
    );
  }

  const modelRows = [
    {
      id: 'resnet50',
      keyName: 'ResNet50 — Deep CNN',
      defaultType: 'Deep Learning / CNN',
      data: modelsData.resnet50,
      icon: Layers,
      color: 'bg-purple-100 text-purple-700',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      id: 'mobilenetv2',
      keyName: 'MobileNetV2 — Lightweight CNN',
      defaultType: 'Lightweight Deep Learning / CNN',
      data: modelsData.mobilenetv2,
      icon: Cpu,
      color: 'bg-blue-100 text-blue-700',
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'random_forest',
      keyName: 'Random Forest — Feature-Based ML',
      defaultType: 'Traditional Machine Learning',
      data: modelsData.random_forest,
      icon: Database,
      color: 'bg-orange-100 text-orange-700',
      badgeColor: 'bg-orange-50 text-orange-700 border-orange-200'
    },
    {
      id: 'ensemble',
      keyName: 'FabricX Ensemble',
      defaultType: 'Weighted Probability Fusion',
      data: modelsData.ensemble,
      icon: Sparkles,
      color: 'bg-emerald-100 text-emerald-700',
      isEnsemble: true,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600" />
            AI Model Comparative Predictions
          </h3>
          <p className="text-xs text-slate-500">
            Real-time individual prediction outputs compared against the combined FabricX Ensemble.
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200 rounded-full font-mono">
          3 Base Models + 1 Ensemble
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Model</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Predicted Fabric</th>
              <th className="py-3 px-4 text-right">Confidence</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {modelRows.map((row) => {
              const Icon = row.icon;
              const hasData = !!row.data;
              const prediction = hasData ? (row.data.prediction || row.data.class || 'N/A') : 'Unavailable';
              const confidence = hasData ? (row.data.confidence !== undefined ? row.data.confidence : 0) : null;
              
              return (
                <tr 
                  key={row.id} 
                  className={`transition-colors ${
                    row.isEnsemble 
                      ? 'bg-purple-50/60 font-semibold border-l-4 border-l-purple-600' 
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${row.color} flex items-center justify-center font-bold`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className={`font-bold ${row.isEnsemble ? 'text-purple-950 font-serif text-base' : 'text-slate-800'}`}>
                          {row.keyName}
                        </span>
                        {row.isEnsemble && (
                          <span className="ml-2 text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-purple-200 text-purple-800 font-bold">
                            Final Combined
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md border ${row.badgeColor}`}>
                      {row.data?.type || row.defaultType}
                    </span>
                  </td>

                  <td className="py-3.5 px-4">
                    {hasData ? (
                      <span className="inline-flex items-center gap-1.5 font-bold text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs font-serif">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {prediction}
                      </span>
                    ) : (
                      <span className="text-slate-400 italic text-xs">Individual model info unavailable</span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    {hasData && confidence !== null ? (
                      <div className="inline-flex flex-col items-end">
                        <span className={`font-mono font-bold text-base ${row.isEnsemble ? 'text-purple-700' : 'text-slate-800'}`}>
                          {typeof confidence === 'number' ? `${confidence.toFixed(1)}%` : `${confidence}%`}
                        </span>
                        <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1 border border-slate-200">
                          <div 
                            className={`h-full rounded-full ${row.isEnsemble ? 'bg-purple-600' : 'bg-blue-500'}`}
                            style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
                          />
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 font-mono text-xs">—</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
