import React from 'react';
import { PROJECT_METRICS } from '../utils/constants';
import { Sparkles, ArrowRight, ShieldCheck, Cpu, Image as ImageIcon, BarChart3 } from 'lucide-react';

export default function Hero({ onStartClassification, onViewPerformance }) {
  return (
    <section id="home" className="relative pt-6 pb-16 overflow-hidden">
      {/* Fabric Swatch Background Overlay (Mimicking colorful woven linen swatches from reference image) */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-90 pointer-events-none">
        <div className="w-full h-full relative bg-gradient-to-r from-pink-200 via-purple-100 to-amber-100">
          {/* Decorative woven color panels simulating fabric swatches background */}
          <div className="absolute top-0 left-0 w-1/6 h-full bg-purple-900/80 mix-blend-multiply border-r border-white/20"></div>
          <div className="absolute top-0 left-[16.6%] w-1/6 h-full bg-rose-700/85 mix-blend-multiply border-r border-white/20"></div>
          <div className="absolute top-0 left-[33.3%] w-1/6 h-full bg-pink-300/80 mix-blend-multiply border-r border-white/20"></div>
          <div className="absolute top-0 left-[50%] w-1/6 h-full bg-purple-200/90 mix-blend-multiply border-r border-white/20"></div>
          <div className="absolute top-0 left-[66.6%] w-1/6 h-full bg-amber-400/85 mix-blend-multiply border-r border-white/20"></div>
          <div className="absolute top-0 left-[83.3%] w-1/6 h-full bg-amber-500/90 mix-blend-multiply"></div>

          {/* Micro Texture Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Floating Glassmorphic Central Card (Matching user reference UI layout perfectly) */}
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 sm:p-14 shadow-2xl border border-white/80 text-center max-w-3xl mx-auto transition-transform duration-500 hover:shadow-indigo-500/10">
          
          {/* Badge */}
          <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200/80 mb-6 shadow-xs">
            <span className="text-xs font-black uppercase tracking-widest text-orange-600">
              REAL-TIME FABRIC CLASSIFIER
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-5xl sm:text-6xl font-extrabold text-indigo-950 tracking-tight mb-3">
            FabricX
          </h1>

          {/* Subheading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 tracking-tight mb-4">
            Intelligent Fabric Classification Using Machine Learning
          </h2>

          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto mb-8 font-medium leading-relaxed">
            Upload a fabric image and let FabricX Classifier identify its fabric type using deep learning &amp; machine learning models.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartClassification}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-base shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2 group"
            >
              <span>LET'S PREDICT</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onViewPerformance}
              className="w-full sm:w-auto px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-700 font-bold text-base border border-slate-200 shadow-sm transition-all duration-300 flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>View Performance</span>
            </button>
          </div>
        </div>

        {/* Project Key Statistics Bar */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-lg text-center hover:border-indigo-200 transition-all">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Fabric Classes
            </div>
            <div className="text-3xl font-extrabold text-indigo-900 font-display">
              {PROJECT_METRICS.classesCount}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Cotton, Denim, Linen, Poly, Silk, Wool
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-lg text-center hover:border-indigo-200 transition-all">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Test Accuracy
            </div>
            <div className="text-3xl font-extrabold text-indigo-600 font-display">
              {PROJECT_METRICS.testAccuracy}%
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              FabricX Ensemble Benchmark
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-lg text-center hover:border-indigo-200 transition-all">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Real-World Accuracy
            </div>
            <div className="text-3xl font-extrabold text-emerald-600 font-display">
              {PROJECT_METRICS.realWorldAccuracy}%
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              413 Unseen Holdout Photos
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-5 border border-slate-200/80 shadow-lg text-center hover:border-indigo-200 transition-all">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              Test Dataset
            </div>
            <div className="text-3xl font-extrabold text-slate-800 font-display">
              {PROJECT_METRICS.testImagesCount}
            </div>
            <div className="text-[11px] text-slate-400 font-medium mt-1">
              Annotated Texture Images
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
