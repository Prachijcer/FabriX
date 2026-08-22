import React, { useState, useRef, useEffect } from 'react';
import { predictFabricImage } from '../services/fabricApi';
import CircularConfidence from '../components/CircularConfidence';
import ModelComparisonTable from '../components/ModelComparisonTable';
import { SAMPLE_FABRICS } from '../data/sampleFabrics';
import { Upload, Trash2, Sparkles, AlertTriangle, CheckCircle2, Sliders, RefreshCw, BarChart2, Eye, ShieldCheck, HelpCircle } from 'lucide-react';

export default function ClassifierPage({ selectedSample, onClearSample }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dimensions, setDimensions] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedSample) {
      handleLoadSampleUrl(selectedSample.image, selectedSample.name);
    }
  }, [selectedSample]);

  const handleFileChange = (selectedFile) => {
    if (!selectedFile) return;

    if (!selectedFile.type.match(/^image\/(jpeg|png|jpg)$/i)) {
      setError('Unsupported file format. Please upload a JPG, JPEG, or PNG image.');
      return;
    }

    setError(null);
    setPredictionResult(null);
    setFile(selectedFile);

    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setDimensions({ width: img.width, height: img.height });
    };
    img.src = url;
  };

  const handleLoadSampleUrl = async (samplePath, sampleName) => {
    setIsLoading(true);
    setError(null);
    setPredictionResult(null);
    try {
      const response = await fetch(samplePath);
      const blob = await response.blob();
      const sampleFile = new File([blob], `${sampleName.toLowerCase()}_sample.png`, { type: 'image/png' });
      setFile(sampleFile);
      const url = URL.createObjectURL(blob);
      setPreviewUrl(url);
      setDimensions({ width: 512, height: 512 });
      
      const result = await predictFabricImage(blob);
      setPredictionResult(result);
    } catch (err) {
      setError(err.message || 'FabricX could not process this image. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setDimensions(null);
    setPredictionResult(null);
    setError(null);
    if (onClearSample) onClearSample();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    try {
      const result = await predictFabricImage(file);
      setPredictionResult(result);
    } catch (err) {
      setError(err.message || 'FabricX could not process this image. Please try another image.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16 px-4 pt-6">
      
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold uppercase tracking-widest text-orange-500 font-sans">
          REAL-TIME PREDICTION & VIRTUAL FEATURE ASSESSMENT
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-purple-950 font-serif">Fabric Classifier</h1>
        <p className="text-base text-slate-600 max-w-xl mx-auto font-sans">
          Upload an image to predict the fabric
        </p>
      </div>

      {/* Upload Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {!previewUrl ? (
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-3xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-4 ${
              isDragOver 
                ? 'border-purple-600 bg-purple-50 scale-[1.01]' 
                : 'border-slate-300 bg-slate-50/50 hover:border-purple-400 hover:bg-purple-50/30'
            }`}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileChange(e.target.files[0])}
              accept="image/jpeg,image/jpg,image/png"
              className="hidden"
            />

            <div className="w-16 h-16 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 shadow-sm">
              <Upload className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <p className="text-lg font-bold text-slate-900 font-serif">
                Drop your fabric image here
              </p>
              <p className="text-xs text-slate-500 font-sans">
                or <span className="text-purple-600 underline font-semibold">Browse Image</span>
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">JPG</span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">JPEG</span>
              <span className="px-2.5 py-1 bg-white rounded border border-slate-200">PNG</span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              <div className="relative aspect-square md:aspect-auto md:h-64 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <img 
                  src={previewUrl} 
                  alt="Fabric Preview" 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="md:col-span-2 space-y-4 font-sans">
                <div className="space-y-1">
                  <span className="text-xs font-extrabold uppercase text-purple-600 tracking-wider">Loaded Image</span>
                  <h3 className="text-xl font-bold text-slate-900 font-serif truncate">{file?.name || 'Fabric Sample Image'}</h3>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Format</span>
                    <p className="text-slate-900 font-bold mt-0.5 font-mono">{file?.type?.split('/')[1]?.toUpperCase() || 'PNG'}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold">Dimensions</span>
                    <p className="text-slate-900 font-bold mt-0.5 font-mono">
                      {dimensions ? `${dimensions.width} x ${dimensions.height} px` : '512 x 512 px'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={handleAnalyze}
                    disabled={isLoading}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-bold text-xs uppercase tracking-wider bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-600/30 disabled:opacity-50 transition-all"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Analyzing Fabric & Features...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Analyze Fabric</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleRemove}
                    disabled={isLoading}
                    className="p-3 rounded-full bg-slate-100 text-slate-600 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 transition-all"
                    title="Remove Image"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Quick Sample Selector Bar */}
        <div className="border-t border-slate-100 pt-4 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500 font-sans">
            <span className="font-semibold text-slate-700 font-sans">Try Benchmark Samples:</span>
            <span>Click to auto-predict</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {SAMPLE_FABRICS.map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleLoadSampleUrl(sample.image, sample.name)}
                disabled={isLoading}
                className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 hover:bg-purple-50 border border-slate-200 hover:border-purple-300 text-xs font-semibold text-slate-700 hover:text-purple-900 transition-all text-left font-sans"
              >
                <img src={sample.image} alt={sample.name} className="w-6 h-6 rounded-lg object-cover border border-slate-300" />
                <span className="truncate">{sample.name}</span>
              </button>
            ))}
          </div>
        </div>

      </div>

      {error && (
        <div className="p-4 rounded-2xl border border-rose-200 bg-rose-50 text-rose-800 flex items-start gap-3 text-xs font-sans">
          <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-sm text-rose-900">Prediction Failed</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="bg-white rounded-3xl p-10 border border-purple-200 text-center space-y-4 shadow-sm animate-pulse">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-700 mx-auto">
            <RefreshCw className="w-7 h-7 animate-spin" />
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-purple-950 font-serif">Analyzing Fabric & Features...</h3>
            <p className="text-xs text-slate-600 max-w-xs mx-auto font-sans">
              Evaluating virtual features, image quality rating (Poor / Moderate / Good), and multi-model classification.
            </p>
          </div>
        </div>
      )}

      {predictionResult && !isLoading && (
        <div className="space-y-8">

          {/* Virtual Feature Image Quality Assessment Panel */}
          {predictionResult.image_quality && (
            <div className={`rounded-3xl p-6 border shadow-xs space-y-4 font-sans ${
              predictionResult.image_quality.rating === 'High Quality'
                ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                : predictionResult.image_quality.rating === 'Good Quality'
                  ? 'bg-blue-50/80 border-blue-200 text-blue-950'
                  : predictionResult.image_quality.rating === 'Moderate Quality'
                    ? 'bg-indigo-50/80 border-indigo-200 text-indigo-950'
                    : 'bg-amber-50/80 border-amber-200 text-amber-950'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-white shadow-xs ${
                    predictionResult.image_quality.rating === 'High Quality'
                      ? 'bg-emerald-600'
                      : predictionResult.image_quality.rating === 'Good Quality'
                        ? 'bg-blue-600'
                        : predictionResult.image_quality.rating === 'Moderate Quality'
                          ? 'bg-indigo-600'
                          : 'bg-amber-600'
                  }`}>
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-sans block">
                      VIRTUAL FEATURE IMAGE QUALITY
                    </span>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-extrabold font-serif">{predictionResult.image_quality.rating}</h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold font-mono ${
                        predictionResult.image_quality.rating === 'High Quality'
                          ? 'bg-emerald-200 text-emerald-900'
                          : predictionResult.image_quality.rating === 'Good Quality'
                            ? 'bg-blue-200 text-blue-900'
                            : predictionResult.image_quality.rating === 'Moderate Quality'
                              ? 'bg-indigo-200 text-indigo-900'
                              : 'bg-amber-200 text-amber-900'
                      }`}>
                        Score: {predictionResult.image_quality.score}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Suitability Status Badge */}
                <div className="flex flex-col items-start sm:items-end">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 font-sans">
                    DETECTION SUITABILITY
                  </span>
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold font-mono mt-0.5 shadow-2xs ${
                    predictionResult.image_quality.rating === 'Poor Quality'
                      ? 'bg-amber-100 text-amber-900 border border-amber-300'
                      : 'bg-white text-slate-900 border border-slate-200'
                  }`}>
                    <ShieldCheck className={`w-3.5 h-3.5 ${
                      predictionResult.image_quality.rating === 'Poor Quality' ? 'text-amber-600' : 'text-emerald-600'
                    }`} />
                    {predictionResult.image_quality.suitability || 'Suitable for Detection'}
                  </span>
                </div>
              </div>

              {/* Recommendation & Virtual Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono pt-1">
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                  <span className="text-slate-500 text-[10px] font-sans block">Sharpness (Laplacian)</span>
                  <span className="font-bold text-slate-900 text-sm">{predictionResult.image_quality.sharpness_var}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                  <span className="text-slate-500 text-[10px] font-sans block">Contrast (RMS Std)</span>
                  <span className="font-bold text-slate-900 text-sm">{predictionResult.image_quality.contrast_std}</span>
                </div>
                <div className="p-3 rounded-xl bg-white/80 border border-slate-200">
                  <span className="text-slate-500 text-[10px] font-sans block">Brightness Mean</span>
                  <span className="font-bold text-slate-900 text-sm">{predictionResult.image_quality.brightness}</span>
                </div>
              </div>

              <p className="text-xs text-slate-700 font-medium pt-1">
                <strong>Virtual Analysis:</strong> {predictionResult.image_quality.recommendation}
              </p>
            </div>
          )}
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-md space-y-8">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              
              <div className="space-y-3 text-center lg:text-left flex-1 font-sans">
                <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-600 flex items-center justify-center lg:justify-start gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Fabric Prediction
                </span>

                <h2 className="text-5xl font-black text-purple-950 font-serif tracking-tight">
                  {predictionResult.prediction}
                </h2>

                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs font-mono">
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                    Model: FabricX Ensemble
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-800 font-bold border border-purple-200">
                    Classes: 5
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    Status: {predictionResult.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl border border-slate-200 shrink-0">
                <CircularConfidence confidence={predictionResult.confidence} size={140} strokeWidth={10} />
              </div>

            </div>

            {predictionResult.extracted_features && (
              <div className="border-t border-slate-100 pt-6 space-y-3 font-sans">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-purple-600" />
                  Extracted Visual & Texture Feature Vectors
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold font-sans">GLCM Contrast</span>
                    <p className="text-slate-900 font-bold mt-0.5">{predictionResult.extracted_features.glcm_contrast}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold font-sans">GLCM Homogeneity</span>
                    <p className="text-slate-900 font-bold mt-0.5">{predictionResult.extracted_features.glcm_homogeneity}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold font-sans">LBP Energy</span>
                    <p className="text-slate-900 font-bold mt-0.5">{predictionResult.extracted_features.lbp_energy}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <span className="text-slate-500 text-[10px] uppercase font-bold font-sans">Edge Density</span>
                    <p className="text-slate-900 font-bold mt-0.5">{predictionResult.extracted_features.edge_density}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <ModelComparisonTable modelsData={predictionResult.models} />

          {predictionResult.probabilities && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 font-sans">
              <h3 className="text-lg font-bold text-slate-900 font-serif flex items-center gap-2">
                <BarChart2 className="w-5 h-5 text-purple-600" />
                Class Probability Distribution
              </h3>

              <div className="space-y-3">
                {Object.entries(predictionResult.probabilities).map(([clsName, probVal]) => (
                  <div key={clsName} className="space-y-1">
                    <div className="flex justify-between text-xs font-bold">
                      <span className={clsName === predictionResult.prediction ? 'text-purple-700 font-extrabold' : 'text-slate-600'}>
                        {clsName}
                      </span>
                      <span className="font-mono text-slate-700">{probVal.toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className={`h-full rounded-full transition-all duration-700 ${
                          clsName === predictionResult.prediction ? 'bg-purple-600' : 'bg-slate-300'
                        }`}
                        style={{ width: `${Math.min(100, Math.max(0, probVal))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
