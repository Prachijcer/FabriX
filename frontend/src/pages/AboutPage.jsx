import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-16 px-4 pt-6 font-sans">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500 block">
          PROJECT BACKGROUND
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-purple-950 font-serif">About FabricX</h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto font-sans">
          Intelligent Fabric Classification Using Machine Learning
        </p>
      </div>

      {/* Main Overview Card */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
        
        {/* Description Paragraph */}
        <p className="text-base text-slate-700 leading-relaxed font-sans font-normal">
          FabricX is an AI-based fabric classification system that identifies different types of fabrics from an uploaded image. The system classifies fabric types including <strong>cotton, denim, linen, silk, and wool</strong>. It analyzes visual features such as texture, patterns, color, edges, and surface characteristics and compares three models—<strong>ResNet50, MobileNetV2, and Random Forest</strong>—to determine the fabric class. Their results are then combined using an ensemble approach to provide a more reliable final prediction. The system can help reduce manual effort in fabric identification and can be useful in textile manufacturing, sorting, quality inspection, and inventory management.
        </p>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          
          <div className="p-5 rounded-2xl bg-purple-50/70 border border-purple-100 space-y-1">
            <h3 className="text-base font-bold text-purple-950 font-serif">Visual Feature Analysis</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Texture, patterns, color, edges, and surface characteristics.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-1">
            <h3 className="text-base font-bold text-blue-950 font-serif">3 AI Models Compared</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              ResNet50 (Deep CNN), MobileNetV2 (Lightweight CNN), & Random Forest (ML).
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-100 space-y-1">
            <h3 className="text-base font-bold text-emerald-950 font-serif">Industry Applications</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Textile manufacturing, sorting, quality inspection, and inventory.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
