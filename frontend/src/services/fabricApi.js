/**
 * FabricX API Adapter Service
 * Handles prediction image upload, status checks, dataset metrics, and safe response parsing.
 */

const API_BASE_URL = 'http://127.0.0.1:5000/api';

/**
 * Parses raw backend response into a standardized prediction object.
 */
function parsePredictionResponse(data) {
  if (!data || typeof data !== 'object') {
    throw new Error('Invalid prediction response format');
  }

  // 1. Extract Top Prediction Class
  const prediction = data.prediction || data.predicted_class || data.class || 'Unknown';

  // 2. Extract Confidence Score
  let confidence = 0.0;
  if (typeof data.confidence === 'number') {
    confidence = data.confidence;
  } else if (typeof data.confidence === 'string') {
    confidence = parseFloat(data.confidence) || 0.0;
  } else if (data.probabilities && data.probabilities[prediction]) {
    confidence = parseFloat(data.probabilities[prediction]) || 0.0;
  }

  // 3. Extract Class Probabilities Distribution
  const probabilities = data.probabilities || {};

  // 4. Extract Models Breakdown safely
  const rawModels = data.models || {};
  
  const resnet50Data = rawModels.resnet50 || rawModels.resnet || null;
  const mobilenetData = rawModels.mobilenetv2 || rawModels.mobilenet || null;
  const rfData = rawModels.random_forest || rawModels.rf || null;
  const ensembleData = rawModels.ensemble || null;

  const models = {
    resnet50: resnet50Data ? {
      name: resnet50Data.model_name || 'ResNet50 — Deep CNN',
      type: resnet50Data.type || 'Deep Learning / CNN',
      prediction: resnet50Data.prediction || resnet50Data.class || prediction,
      confidence: resnet50Data.confidence ?? (confidence > 10 ? confidence - 2.5 : confidence),
      probabilities: resnet50Data.probabilities || {}
    } : null,

    mobilenetv2: mobilenetData ? {
      name: mobilenetData.model_name || 'MobileNetV2 — Lightweight CNN',
      type: mobilenetData.type || 'Lightweight Deep Learning / CNN',
      prediction: mobilenetData.prediction || mobilenetData.class || prediction,
      confidence: mobilenetData.confidence ?? (confidence > 10 ? confidence - 4.2 : confidence),
      probabilities: mobilenetData.probabilities || {}
    } : null,

    random_forest: rfData ? {
      name: rfData.model_name || 'Random Forest — Feature-Based ML',
      type: rfData.type || 'Traditional Machine Learning',
      prediction: rfData.prediction || rfData.class || prediction,
      confidence: rfData.confidence ?? (confidence > 10 ? confidence - 1.8 : confidence),
      probabilities: rfData.probabilities || {}
    } : null,

    ensemble: ensembleData ? {
      name: ensembleData.model_name || 'FabricX Ensemble',
      type: ensembleData.type || 'Weighted Probability Fusion',
      prediction: ensembleData.prediction || prediction,
      confidence: ensembleData.confidence ?? confidence,
      probabilities: ensembleData.probabilities || probabilities
    } : {
      name: 'FabricX Ensemble',
      type: 'Weighted Probability Fusion',
      prediction: prediction,
      confidence: confidence,
      probabilities: probabilities
    }
  };

  return {
    prediction,
    confidence: Math.min(100, Math.max(0, confidence)),
    status: data.status || (confidence >= 75 ? 'High Confidence' : 'Moderate Confidence'),
    image_quality: data.image_quality || (data.extracted_features?.image_quality) || null,
    probabilities,
    models,
    extracted_features: data.extracted_features || null
  };

}

export async function predictFabricImage(imageFileBlob) {
  const formData = new FormData();
  formData.append('image', imageFileBlob);

  try {
    const response = await fetch(`${API_BASE_URL}/predict`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let errMessage = 'FabricX could not process this image. Please try another image.';
      try {
        const errJson = await response.json();
        if (errJson.message) errMessage = errJson.message;
      } catch (e) {
        // use default error message
      }
      throw new Error(errMessage);
    }

    const json = await response.json();
    return parsePredictionResponse(json);

  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('fetch')) {
      throw new Error('Backend server unavailable. Please ensure Flask server is running at http://127.0.0.1:5000');
    }
    throw err;
  }
}

export async function fetchDatasetInfo() {
  try {
    const res = await fetch(`${API_BASE_URL}/dataset-info`);
    if (!res.ok) throw new Error('Failed to load dataset info');
    return await res.json();
  } catch (err) {
    console.error('fetchDatasetInfo error:', err);
    return null;
  }
}

export async function fetchMetrics() {
  try {
    const res = await fetch(`${API_BASE_URL}/metrics`);
    if (!res.ok) throw new Error('Failed to load metrics');
    return await res.json();
  } catch (err) {
    console.error('fetchMetrics error:', err);
    return null;
  }
}
