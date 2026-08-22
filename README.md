# FabricX — Intelligent Fabric Classification System

FabricX is a modern, professional, AI-powered fabric classification web application built with **React**, **Vite**, **Tailwind CSS**, and **Lucide Icons**, designed for real-world integration with a **Flask API backend**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The web application will launch locally at: `http://localhost:3000` (or `http://localhost:5173`).

---

## 🔗 Connecting to Existing Flask Backend

The application is configured to connect directly to your Flask API running locally at:
`http://127.0.0.1:5000`

### Expected API Endpoints:

1. **`GET /`** or **`GET /api/models`**: Used for automated health check polling to update the **"Flask API Online"** / **"Backend Offline"** status indicator in the top navbar.
2. **`POST /api/predict`**: Accepts uploaded fabric images sent via `multipart/form-data` under the form key `file` or `image`.

### Supported Backend JSON Response Format:
FabricX dynamically parses and normalizes backend JSON responses:

```json
{
  "prediction": "Cotton",
  "confidence": 92.4,
  "model": "FabricX Ensemble",
  "probabilities": {
    "Cotton": 92.4,
    "Denim": 3.1,
    "Linen": 2.2,
    "Polyester": 1.1,
    "Silk": 0.7,
    "Wool": 0.5
  }
}
```

*Note: Alternate key names such as `predicted_class`, `confidence_score`, `class_probabilities`, etc. are automatically recognized.*

---

## 📊 Benchmark Metrics Included

- **Test Accuracy**: 85.89% (716 Test Images)
- **Real-World Accuracy**: 86.44% (413 Unseen Real-World Fabric Photographs)
- **Models Benchmarked**:
  - **FabricX Ensemble**: 85.89% (Macro Precision: 81.19%, Recall: 86.49%, Macro F1: 83.31%, Weighted F1: 85.89%)
  - **ResNet50**: 82.12%
  - **Random Forest**: 81.98%
  - **MobileNetV2**: 76.12%
- **Per-Class F1 Scores**: Denim (91.21%), Cotton (88.02%), Linen (82.35%), Polyester (82.13%), Silk (82.05%), Wool (74.07%).

---

## 📁 Sample Dataset Directory

Sample dataset images for 1-click UI testing are stored under:
```
public/dataset/
├── cotton/
├── denim/
├── linen/
├── polyester/
├── silk/
└── wool/
```
