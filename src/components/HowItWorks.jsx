import React from 'react';
import { Upload, Sliders, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Upload Image',
      description: 'Upload a macro photograph of a fabric texture in JPG, JPEG, or PNG format.',
      icon: Upload,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      num: '02',
      title: 'Image Processing',
      description: 'Image is resized, normalized, and converted into multi-channel tensor matrices.',
      icon: Sliders,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      num: '03',
      title: 'AI Classification',
      description: 'Features pass through FabricX Ensemble (ResNet50 + MobileNetV2 + Random Forest).',
      icon: Cpu,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      num: '04',
      title: 'Fabric Prediction',
      description: 'Generates predicted class, confidence percentage, and class probability distribution.',
      icon: Sparkles,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Workflow Pipeline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            How FabricX Works
          </h2>
          <p className="text-base text-slate-600 font-medium">
            From raw fabric image upload to deep learning feature extraction and ensemble prediction.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="bg-slate-50 hover:bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div>
                  {/* Step Number Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-display font-black text-2xl text-slate-400 group-hover:text-indigo-600 transition-colors">
                      {step.num}
                    </span>
                    <div className={`p-3 rounded-2xl border ${step.color} shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold font-display text-slate-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
