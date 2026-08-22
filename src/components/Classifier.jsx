import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, Trash2, Sparkles, RefreshCw, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { predictFabric } from '../services/api';
import PredictionResult from './PredictionResult';
import SampleGallery from './SampleGallery';

export default function Classifier({ backendStatus, onRetryBackend }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const fileInputRef = useRef(null);

  // Validate File Format
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Invalid file format. Please upload a JPG, JPEG, or PNG image.');
      return false;
    }
    setErrorMessage(null);
    return true;
  };

  // Handle File Selection via File Input
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  // Process File Object & Create Preview
  const processFile = (file, sampleId = null) => {
    setSelectedFile(file);
    setSelectedSampleId(sampleId);
    setPredictionResult(null);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Drag & Drop Handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  // Load Sample Image from Sample Gallery
  const handleSelectSample = async (sample) => {
    setSelectedSampleId(sample.id);
    setPredictionResult(null);
    setErrorMessage(null);

    try {
      const response = await fetch(sample.imagePath);
      const blob = await response.blob();
      const file = new File([blob], sample.filename, { type: blob.type || 'image/svg+xml' });
      processFile(file, sample.id);
    } catch (err) {
      console.error('Failed to load sample image:', err);
      setPreviewUrl(sample.imagePath);
      setSelectedFile(null);
    }
  };

  // Clear Selected Image
  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setSelectedSampleId(null);
    setPredictionResult(null);
    setErrorMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Run Fabric Prediction Analysis
  const handleAnalyze = async () => {
    if (!selectedFile && !previewUrl) {
      setErrorMessage('Please select or upload a fabric image first.');
      return;
    }

    // Check if backend is available
    if (!backendStatus.online) {
      setErrorMessage('Unable to connect to the FabricX prediction server. Please make sure the Flask backend is running.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      // If we have a File object, pass it directly
      let fileToUpload = selectedFile;
      
      // If selected from sample and file is null, convert previewUrl to Blob
      if (!fileToUpload && previewUrl) {
        const res = await fetch(previewUrl);
        const blob = await res.blob();
        fileToUpload = new File([blob], 'fabric_sample.png', { type: blob.type || 'image/png' });
      }

      const result = await predictFabric(fileToUpload);
      setPredictionResult(result);
    } catch (err) {
      console.error('Prediction analysis failed:', err);
      setErrorMessage(
        err.message || 'Unable to connect to the FabricX prediction server. Please make sure the Flask backend is running at http://127.0.0.1:5000'
      );
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="classifier" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Fabric Classification Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight mb-3">
            Classify Fabric Material
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Upload a fabric macro photograph or choose a sample image to classify its textile material.
          </p>
        </div>

        {/* Backend Connection Warning Notice (Shown if offline) */}
        {!backendStatus.online && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-amber-900">
                  Flask Backend Offline (`http://127.0.0.1:5000`)
                </h4>
                <p className="text-xs text-amber-700 mt-0.5">
                  Start your Flask backend server to enable live AI fabric classification.
                </p>
              </div>
            </div>
            <button
              onClick={onRetryBackend}
              className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-sm transition-colors flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* Main Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xl">
          
          <h3 className="text-xl font-bold text-slate-900 font-display mb-6 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-indigo-600" />
            <span>Upload Fabric Image</span>
          </h3>

          {/* Drag & Drop Upload Area */}
          {!previewUrl ? (
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
                isDragOver
                  ? 'border-indigo-600 bg-indigo-50/50 scale-[0.99]'
                  : 'border-slate-300 hover:border-indigo-400 bg-slate-50/50 hover:bg-indigo-50/20'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/svg+xml"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 shadow-sm border border-indigo-100/60">
                <Upload className="w-8 h-8" />
              </div>

              <p className="text-base font-bold text-slate-800 mb-1">
                Drag &amp; drop your fabric image here
              </p>
              <p className="text-sm text-slate-500 mb-4">
                or <span className="text-indigo-600 font-semibold underline underline-offset-2">choose an image from your device</span>
              </p>

              <div className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-200">
                <span>Supported: JPG, JPEG, PNG</span>
              </div>
            </div>
          ) : (
            /* Image Preview Area */
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 max-h-96 flex items-center justify-center">
                <img
                  src={previewUrl}
                  alt="Fabric Preview"
                  className="max-h-96 w-auto object-contain"
                />
                
                {/* Overlay Badge */}
                <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {selectedFile ? selectedFile.name : `${selectedSampleId?.toUpperCase()} Sample Loaded`}
                  </span>
                </div>

                <button
                  onClick={handleClear}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-slate-900/80 hover:bg-rose-600 text-white transition-colors backdrop-blur-md shadow-md"
                  title="Clear Image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing}
                  className={`flex-1 w-full py-4 px-6 rounded-2xl text-white font-bold text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                    isAnalyzing
                      ? 'bg-indigo-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 shadow-indigo-500/25 active:scale-98'
                  }`}
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      <span>Analyzing fabric...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>Analyze Fabric</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleClear}
                  disabled={isAnalyzing}
                  className="w-full sm:w-auto py-4 px-6 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-base transition-colors"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Error Banner */}
          {errorMessage && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-semibold flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

        </div>

        {/* Interactive Demo Dataset Gallery */}
        <SampleGallery
          onSelectSample={handleSelectSample}
          selectedSampleId={selectedSampleId}
        />

        {/* Prediction Results Card */}
        {predictionResult && (
          <div className="mt-8">
            <PredictionResult predictionResult={predictionResult} />
          </div>
        )}

      </div>
    </section>
  );
}
