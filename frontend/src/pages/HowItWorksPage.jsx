import React from 'react';
import { Upload, Sliders, Cpu, Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorksPage({ setActivePage }) {
  const steps = [
    {
      num: '01',
      title: 'Upload',
      desc: 'User uploads a high-resolution fabric texture image (JPG, JPEG, PNG) or selects a benchmark sample.',
      icon: Upload,
      color: 'bg-purple-100 text-purple-700 border-purple-200'
    },
    {
      num: '02',
      title: 'Preprocess',
      desc: 'Image is resized, normalized, and converted into multi-channel visual feature vectors (GLCM, LBP, HSV, Edge Density).',
      icon: Sliders,
      color: 'bg-orange-100 text-orange-700 border-orange-200'
    },
    {
      num: '03',
      title: 'Analyze',
      desc: 'Three models (ResNet50 Deep CNN, MobileNetV2 Lightweight CNN, and Random Forest ML) process the image in parallel.',
      icon: Cpu,
      color: 'bg-blue-100 text-blue-700 border-blue-200'
    },
    {
      num: '04',
      title: 'Predict',
      desc: 'FabricX Ensemble combines predictions using soft-voting weighted probability fusion to provide the final fabric class.',
      icon: Sparkles,
      color: 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-16 px-4 pt-6">
      
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500 font-sans">
          STEP-BY-STEP PROCESS
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-purple-950 font-serif">How It Works</h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto font-sans">
          FabricX processes fabric imagery through a four-stage pipeline to deliver highly accurate material identification.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {steps.map((step) => {
          const Icon = step.icon;
          return (
            <div key={step.num} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4 relative overflow-hidden group hover:shadow-md transition-all">
              <span className="text-6xl font-black text-slate-100 font-mono absolute top-4 right-6 pointer-events-none select-none">
                {step.num}
              </span>
              <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center font-bold font-mono text-base ${step.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 font-serif">{step.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed font-sans">{step.desc}</p>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-3xl p-8 text-white text-center space-y-4 shadow-xl">
        <h3 className="text-2xl font-bold font-serif">Ready to Test Your Fabric Sample?</h3>
        <p className="text-sm text-purple-200 max-w-md mx-auto">
          Upload any fabric image and let FabricX analyze its visual texture.
        </p>
        <button
          onClick={() => setActivePage('classifier')}
          className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-bold text-xs uppercase tracking-wider bg-white text-purple-900 hover:bg-purple-50 transition-all shadow-md"
        >
          <span>LET'S PREDICT</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
