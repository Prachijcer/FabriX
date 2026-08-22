import React from 'react';

export default function CircularConfidence({ confidence = 0.0, size = 160, strokeWidth = 12 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const normalizedConfidence = Math.min(100, Math.max(0, confidence));
  const strokeDashoffset = circumference - (normalizedConfidence / 100) * circumference;

  // Dynamic stroke color based on confidence score
  let strokeColor = "#3b82f6"; // Blue default
  if (normalizedConfidence >= 85) {
    strokeColor = "#10b981"; // Emerald green
  } else if (normalizedConfidence >= 70) {
    strokeColor = "#6366f1"; // Indigo
  } else {
    strokeColor = "#f59e0b"; // Amber
  }

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(30, 41, 59, 0.8)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Animated Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      {/* Center Percentage Display */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-extrabold text-white tracking-tight font-mono">
          {normalizedConfidence.toFixed(1)}%
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-0.5">
          Confidence
        </span>
      </div>
    </div>
  );
}
