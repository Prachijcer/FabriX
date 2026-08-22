import os
import numpy as np
from PIL import Image, ImageFilter

def create_cotton_texture(size=(512, 512)):
    # Soft, organic fine grid pattern with light warm white/beige hue
    arr = np.full((size[1], size[0], 3), [242, 239, 233], dtype=np.float32)
    
    # Add subtle weave grid
    y, x = np.ogrid[:size[1], :size[0]]
    grid_vert = (np.sin(x * 0.4) * 6).astype(np.float32)
    grid_horiz = (np.sin(y * 0.4) * 6).astype(np.float32)
    
    for c in range(3):
        arr[:, :, c] += grid_vert + grid_horiz
        
    # Add fine noise for fiber texture
    noise = np.random.normal(0, 4, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(0.6))
    return img

def create_denim_texture(size=(512, 512)):
    # Classic indigo blue with distinct 3/1 right-hand diagonal twill weave pattern
    arr = np.zeros((size[1], size[0], 3), dtype=np.float32)
    indigo = np.array([28, 54, 110], dtype=np.float32)
    white_warp = np.array([220, 225, 235], dtype=np.float32)
    
    y, x = np.ogrid[:size[1], :size[0]]
    # Diagonal twill lines at 45 degrees
    twill = ((x + y * 2) % 6 < 4)
    
    for c in range(3):
        arr[:, :, c] = np.where(twill, indigo[c], white_warp[c])
        
    # Add horizontal slub noise
    noise = np.random.normal(0, 12, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(0.4))
    return img

def create_linen_texture(size=(512, 512)):
    # Coarse, textured natural flax with uneven slub threads and light beige tint
    arr = np.full((size[1], size[0], 3), [225, 215, 195], dtype=np.float32)
    
    # Coarse irregular thread grid
    y, x = np.ogrid[:size[1], :size[0]]
    slub_x = (np.sin(x * 0.15 + np.sin(y * 0.05)) * 14).astype(np.float32)
    slub_y = (np.cos(y * 0.15 + np.sin(x * 0.05)) * 14).astype(np.float32)
    
    for c in range(3):
        arr[:, :, c] += slub_x + slub_y
        
    noise = np.random.normal(0, 8, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(0.5))
    return img

def create_polyester_texture(size=(512, 512)):
    # Synthetic smooth micro-mesh with cool bluish gray technical sheen
    arr = np.full((size[1], size[0], 3), [200, 210, 225], dtype=np.float32)
    
    y, x = np.ogrid[:size[1], :size[0]]
    dots = ((x % 8 == 0) & (y % 8 == 0)).astype(np.float32) * 20.0
    lines = (np.sin(x * 0.8) * 4 + np.cos(y * 0.8) * 4).astype(np.float32)
    
    for c in range(3):
        arr[:, :, c] += lines - dots
        
    noise = np.random.normal(0, 3, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr)
    return img

def create_silk_texture(size=(512, 512)):
    # Luxurious smooth surface with lustrous satin sheen wave/gradient
    arr = np.zeros((size[1], size[0], 3), dtype=np.float32)
    base_color = np.array([195, 160, 185], dtype=np.float32) # Soft violet/magenta silk
    
    y, x = np.ogrid[:size[1], :size[0]]
    sheen = (np.sin(x * 0.02 + y * 0.015) * 45 + np.cos(x * 0.01 - y * 0.02) * 35).astype(np.float32)
    
    for c in range(3):
        arr[:, :, c] = base_color[c] + sheen
        
    noise = np.random.normal(0, 2, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(1.2))
    return img

def create_wool_texture(size=(512, 512)):
    # Coarse, warm fuzzy looped fiber texture in warm heather grey/charcoal
    arr = np.full((size[1], size[0], 3), [135, 128, 122], dtype=np.float32)
    
    y, x = np.ogrid[:size[1], :size[0]]
    loops = (np.sin(x * 0.2 + y * 0.3) * 18 + np.cos(x * 0.3 - y * 0.2) * 18).astype(np.float32)
    
    for c in range(3):
        arr[:, :, c] += loops
        
    noise = np.random.normal(0, 15, (size[1], size[0], 3))
    arr += noise
    arr = np.clip(arr, 0, 255).astype(np.uint8)
    img = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(0.8))
    return img

def main():
    dest_dirs = [
        r"C:\Users\prach\.gemini\antigravity\scratch\fabricx\backend\samples",
        r"C:\Users\prach\.gemini\antigravity\scratch\fabricx\frontend\public\samples"
    ]
    for d in dest_dirs:
        os.makedirs(d, exist_ok=True)

    generators = {
        "cotton": create_cotton_texture,
        "denim": create_denim_texture,
        "linen": create_linen_texture,
        "polyester": create_polyester_texture,
        "silk": create_silk_texture,
        "wool": create_wool_texture,
    }

    for name, gen in generators.items():
        img = gen()
        for d in dest_dirs:
            filepath = os.path.join(d, f"{name}.png")
            img.save(filepath)
            print(f"Saved {filepath}")

if __name__ == "__main__":
    main()
