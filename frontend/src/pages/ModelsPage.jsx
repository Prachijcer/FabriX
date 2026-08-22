import React from 'react';
import { Layers, Cpu, Database, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ModelsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-16 px-4 pt-6">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500 font-sans">
          ALGORITHMIC COMPARISON
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-purple-950 font-serif">Machine Learning Models</h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto font-sans">
          FabricX evaluates fabric imagery across three distinct model architectures to deliver robust classification results.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* ResNet50 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700">
              <Layers className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-purple-600 tracking-wider">
                Deep Learning / CNN
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif mt-1">ResNet50 — Deep CNN</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Learn detailed visual characteristics from fabric images such as texture, patterns, edges, shapes, and surface appearance using 50 residual layer blocks.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual Focus:</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Microscopic Texture & Weave</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Spatial Thread Orientations</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-purple-600" /> Edge Maps & Contour Shapes</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 text-xs font-sans">
            <span className="text-purple-600 text-[10px] block font-bold uppercase">Model Type</span>
            <span className="text-purple-950 font-bold font-serif">Deep CNN</span>
          </div>
        </div>

        {/* MobileNetV2 */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
              <Cpu className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-blue-600 tracking-wider">
                Lightweight Deep Learning / CNN
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif mt-1">MobileNetV2 — Lightweight CNN</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Learn visual characteristics while using fewer computational resources via inverted residual blocks and depthwise separable convolutions.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Visual Focus:</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> High Efficiency Inverted Residuals</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Low Latency Feature Maps</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Optimized Memory Footprint</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-xs font-sans">
            <span className="text-blue-600 text-[10px] block font-bold uppercase">Model Type</span>
            <span className="text-blue-950 font-bold font-serif">Lightweight CNN</span>
          </div>
        </div>

        {/* Random Forest */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-md transition-all">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700">
              <Database className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold uppercase text-orange-600 tracking-wider">
                Traditional Machine Learning
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 font-serif mt-1">Random Forest — Feature-Based ML</h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Classify fabric based on extracted numerical features such as GLCM matrix, LBP uniform patterns, Gabor responses, HSV statistics, and Canny edge density.
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-100 font-sans">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Engineered Features:</span>
              <ul className="space-y-1.5 text-xs text-slate-700">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> GLCM Contrast & Homogeneity</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> LBP Energy & Uniform Patterns</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-orange-600" /> Gabor Multi-Angle Responses</li>
              </ul>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 text-xs font-sans">
            <span className="text-orange-600 text-[10px] block font-bold uppercase">Model Type</span>
            <span className="text-orange-950 font-bold font-serif">Traditional ML</span>
          </div>
        </div>

      </div>

      {/* FabricX Ensemble */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-serif">FabricX Ensemble Fusion</h3>
            <p className="text-xs text-slate-500 font-sans">Soft-Voting Aggregation Strategy</p>
          </div>
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-sans">
          ResNet50, MobileNetV2, and Random Forest operate as separate models. Their individual prediction probabilities are combined by the FabricX Ensemble logic to generate the final fabric class and confidence score.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center text-xs font-sans pt-2">
          <div className="p-3 rounded-xl bg-purple-50 border border-purple-100 font-bold text-purple-900">
            ResNet50 (40%)
          </div>
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 font-bold text-blue-900">
            MobileNetV2 (35%)
          </div>
          <div className="p-3 rounded-xl bg-orange-50 border border-orange-100 font-bold text-orange-900">
            Random Forest (25%)
          </div>
          <div className="p-3 rounded-xl bg-emerald-600 text-white font-bold font-serif shadow-sm">
            = FabricX Ensemble
          </div>
        </div>
      </div>

    </div>
  );
}
