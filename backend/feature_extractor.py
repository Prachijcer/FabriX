import cv2
import numpy as np
from PIL import Image
from skimage.feature import graycomatrix, graycoprops, local_binary_pattern
from skimage.filters import gabor

CLASSES = ["Cotton", "Denim", "Linen", "Silk", "Wool"]

def assess_image_quality(img_gray, img_rgb):
    """
    Evaluates image virtual features and suitability for fabric detection:
    - Sharpness / Blur variance (Laplacian)
    - Contrast (RMS standard deviation)
    - Illumination uniformity (Brightness mean)
    - Virtual Feature Suitability: Poor / Moderate / Good / High
    """
    # 1. Sharpness (Laplacian Variance)
    laplacian_var = float(cv2.Laplacian(img_gray, cv2.CV_64F).var())
    
    # 2. Contrast (RMS Contrast)
    contrast_std = float(np.std(img_gray))
    
    # 3. Brightness
    brightness_mean = float(np.mean(img_gray))
    
    # Calculate Quality Score (0 - 100)
    sharp_score = min(100.0, (laplacian_var / 120.0) * 100.0)
    contrast_score = min(100.0, (contrast_std / 35.0) * 100.0)
    
    if 50 <= brightness_mean <= 220:
        bright_score = 100.0
    else:
        bright_score = max(40.0, 100.0 - abs(brightness_mean - 135.0))
        
    overall_score = round(0.45 * sharp_score + 0.35 * contrast_score + 0.20 * bright_score, 1)
    overall_score = min(98.5, max(30.0, overall_score))
    
    # 4-Tier Rating Logic: High / Good / Moderate / Poor
    if overall_score >= 80.0 or laplacian_var >= 150.0:
        rating = "High Quality"
        suitability = "Good (Optimal for Detection)"
        recommendation = "High visual sharpness and clear weave texture. Excellent image quality for AI detection."
        badge_color = "emerald"
    elif overall_score >= 65.0 or laplacian_var >= 60.0:
        rating = "Good Quality"
        suitability = "Good (Suitable for Detection)"
        recommendation = "Good visual texture resolution. Clear pattern detection expected."
        badge_color = "blue"
    elif overall_score >= 48.0 or laplacian_var >= 20.0:
        rating = "Moderate Quality"
        suitability = "Moderate (Acceptable for Detection)"
        recommendation = "Moderate texture clarity. Detection is functional but higher resolution is recommended."
        badge_color = "indigo"
    else:
        rating = "Poor Quality"
        recommendation = "Low image sharpness or sub-optimal lighting detected. Image quality is poor for reliable detection."
        suitability = "Poor (Unsuitable / Retry Suggested)"
        badge_color = "amber"
        
    return {
        "rating": rating,
        "suitability": suitability,
        "score": overall_score,
        "sharpness_var": round(laplacian_var, 1),
        "contrast_std": round(contrast_std, 1),
        "brightness": round(brightness_mean, 1),
        "recommendation": recommendation,
        "badge_color": badge_color
    }

def extract_features(pil_image):
    """
    Extract visual, color, texture, and image quality features from PIL image.
    """
    img_rgb = np.array(pil_image.convert('RGB'))
    img_gray = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2GRAY)
    
    # Image Quality Assessment
    quality_info = assess_image_quality(img_gray, img_rgb)
    
    # 1. GLCM Features
    gray_q = (img_gray // 4).astype(np.uint8)
    glcm = graycomatrix(gray_q, distances=[1, 3], angles=[0, np.pi/4, np.pi/2, 3*np.pi/4], levels=64, symmetric=True, normed=True)
    
    contrast = float(np.mean(graycoprops(glcm, 'contrast')))
    dissimilarity = float(np.mean(graycoprops(glcm, 'dissimilarity')))
    homogeneity = float(np.mean(graycoprops(glcm, 'homogeneity')))
    energy = float(np.mean(graycoprops(glcm, 'energy')))
    correlation = float(np.mean(graycoprops(glcm, 'correlation')))
    asm = float(np.mean(graycoprops(glcm, 'ASM')))
    
    # 2. LBP (Local Binary Patterns)
    radius = 2
    n_points = 8 * radius
    lbp = local_binary_pattern(img_gray, n_points, radius, method='uniform')
    lbp_hist, _ = np.histogram(lbp.ravel(), bins=np.arange(0, n_points + 3), range=(0, n_points + 2))
    lbp_hist = lbp_hist.astype("float")
    lbp_hist /= (lbp_hist.sum() + 1e-7)
    lbp_energy = float(np.sum(lbp_hist ** 2))
    lbp_mean = float(np.mean(lbp))
    
    # 3. Gabor Filter Responses
    gabor_features = []
    for frequency in (0.1, 0.3):
        for theta in (0, np.pi/4, np.pi/2, 3*np.pi/4):
            filt_real, _ = gabor(img_gray, frequency=frequency, theta=theta)
            gabor_features.append(float(np.mean(np.abs(filt_real))))
    gabor_mean = float(np.mean(gabor_features))
    
    # 4. HSV Color Statistics
    img_hsv = cv2.cvtColor(img_rgb, cv2.COLOR_RGB2HSV)
    h_mean, s_mean, v_mean = [float(x) for x in np.mean(img_hsv, axis=(0, 1))]
    h_std, s_std, v_std = [float(x) for x in np.std(img_hsv, axis=(0, 1))]
    
    # 5. Canny Edge Density
    edges = cv2.Canny(img_gray, 50, 150)
    edge_density = float(np.mean(edges > 0))
    
    feature_dict = {
        "glcm_contrast": round(contrast, 3),
        "glcm_homogeneity": round(homogeneity, 3),
        "glcm_energy": round(energy, 3),
        "glcm_correlation": round(correlation, 3),
        "lbp_energy": round(lbp_energy, 4),
        "gabor_response": round(gabor_mean, 3),
        "hsv_mean": [round(h_mean, 1), round(s_mean, 1), round(v_mean, 1)],
        "edge_density": round(edge_density, 4),
        "image_shape": [img_rgb.shape[1], img_rgb.shape[0]],
        "image_quality": quality_info
    }
    
    feature_vector = np.array([
        contrast, dissimilarity, homogeneity, energy, correlation, asm,
        lbp_energy, lbp_mean, gabor_mean,
        h_mean, s_mean, v_mean, h_std, s_std, v_std,
        edge_density
    ], dtype=np.float32)
    
    return feature_dict, feature_vector
