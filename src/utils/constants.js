export const FABRIC_CLASSES = [
  { id: 'cotton', name: 'Cotton', color: 'bg-emerald-500', f1: 88.02, description: 'Natural soft fiber from cotton plants. Highly breathable and absorbent.' },
  { id: 'denim', name: 'Denim', color: 'bg-indigo-600', f1: 91.21, description: 'Sturdy cotton warp-faced twill textile. Highest prediction accuracy class.', isBest: true },
  { id: 'linen', name: 'Linen', color: 'bg-amber-500', f1: 82.35, description: 'Textile made from flax plant fibers. Lightweight with distinctive slub weave.' },
  { id: 'polyester', name: 'Polyester', color: 'bg-sky-500', f1: 82.13, description: 'Synthetic polymer fabric known for durability and wrinkle resistance.' },
  { id: 'silk', name: 'Silk', color: 'bg-purple-500', f1: 82.05, description: 'Natural protein fiber woven into smooth, lustrous luxury textiles.' },
  { id: 'wool', name: 'Wool', color: 'bg-rose-500', f1: 74.07, description: 'Textile fiber obtained from sheep and other animals. High thermal insulation.', isChallenging: true },
];

export const PROJECT_METRICS = {
  classesCount: 6,
  testAccuracy: 85.89,
  realWorldAccuracy: 86.44,
  testImagesCount: 716,
  realWorldImagesCount: 413,
  macroPrecision: 81.19,
  macroRecall: 86.49,
  macroF1: 83.31,
  weightedF1: 85.89,
};

export const MODELS_DATA = [
  {
    id: 'ensemble',
    name: 'FabricX Ensemble',
    accuracy: 85.89,
    architecture: 'Deep Learning + ML Hybrid (ResNet50 + Random Forest + MobileNetV2)',
    isRecommended: true,
    precision: 81.19,
    recall: 86.49,
    macroF1: 83.31,
    weightedF1: 85.89,
    description: 'Combines feature representations from ResNet50 and MobileNetV2 with classical decision boundaries for maximum real-world reliability.'
  },
  {
    id: 'resnet50',
    name: 'ResNet50',
    accuracy: 82.12,
    architecture: '50-layer Residual Neural Network (Transfer Learning)',
    isRecommended: false,
    precision: 79.80,
    recall: 82.40,
    macroF1: 80.95,
    weightedF1: 82.12,
    description: 'Deep convolutional model capturing high-level micro-structural fabric weave patterns.'
  },
  {
    id: 'random_forest',
    name: 'Random Forest',
    accuracy: 81.98,
    architecture: 'Classical ML Ensemble (Extracted Color/Texture GLCM Features)',
    isRecommended: false,
    precision: 78.90,
    recall: 81.50,
    macroF1: 80.12,
    weightedF1: 81.98,
    description: 'Trained on GLCM, LBP texture descriptors, and HSV color histograms for interpretable classification.'
  },
  {
    id: 'mobilenetv2',
    name: 'MobileNetV2',
    accuracy: 76.12,
    architecture: 'Lightweight Depthwise Separable CNN',
    isRecommended: false,
    precision: 74.20,
    recall: 76.50,
    macroF1: 75.10,
    weightedF1: 76.12,
    description: 'Optimized for low-latency edge deployment with minimal computational footprint.'
  }
];

export const SAMPLE_DATASET = [
  {
    id: 'cotton',
    name: 'Cotton',
    filename: 'cotton_sample.svg',
    imagePath: '/dataset/cotton/cotton_sample.svg',
    thumbBg: 'from-slate-100 to-emerald-50',
    tag: 'Natural Fiber'
  },
  {
    id: 'denim',
    name: 'Denim',
    filename: 'denim_sample.svg',
    imagePath: '/dataset/denim/denim_sample.svg',
    thumbBg: 'from-blue-100 to-indigo-100',
    tag: 'Twill Weave'
  },
  {
    id: 'linen',
    name: 'Linen',
    filename: 'linen_sample.svg',
    imagePath: '/dataset/linen/linen_sample.svg',
    thumbBg: 'from-amber-50 to-orange-100',
    tag: 'Flax Fiber'
  },
  {
    id: 'polyester',
    name: 'Polyester',
    filename: 'polyester_sample.svg',
    imagePath: '/dataset/polyester/polyester_sample.svg',
    thumbBg: 'from-sky-100 to-blue-50',
    tag: 'Synthetic'
  },
  {
    id: 'silk',
    name: 'Silk',
    filename: 'silk_sample.svg',
    imagePath: '/dataset/silk/silk_sample.svg',
    thumbBg: 'from-purple-100 to-pink-100',
    tag: 'Protein Fiber'
  },
  {
    id: 'wool',
    name: 'Wool',
    filename: 'wool_sample.svg',
    imagePath: '/dataset/wool/wool_sample.svg',
    thumbBg: 'from-rose-100 to-red-100',
    tag: 'Animal Fiber'
  }
];
