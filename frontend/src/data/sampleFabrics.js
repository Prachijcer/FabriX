export const SAMPLE_FABRICS = [
  {
    id: 'cotton',
    name: 'Cotton',
    type: 'Natural Plant Fiber',
    description: 'Soft and breathable natural fabric.',
    fullDescription: 'Cotton is a soft, fluffy staple fiber that grows in a boll around the seeds of cotton plants. Highly breathable, absorbent, and durable with fine matte surface weave.',
    image: '/samples/cotton.png',
    features: {
      glcmContrast: 1.28,
      homogeneity: 0.63,
      dominantColor: 'Warm White / Off-White',
      edgeDensity: 'Low-Medium'
    }
  },
  {
    id: 'denim',
    name: 'Denim',
    type: 'Woven Cotton Twill',
    description: 'Strong woven cotton fabric commonly used for jeans.',
    fullDescription: 'Denim is a sturdy cotton warp-faced textile in which the weft passes under two or more warp threads, producing a characteristic diagonal 3/1 right-hand twill weave with indigo hue.',
    image: '/samples/denim.png',
    features: {
      glcmContrast: 8.45,
      homogeneity: 0.42,
      dominantColor: 'Deep Indigo Blue',
      edgeDensity: 'High (Diagonal Lines)'
    }
  },
  {
    id: 'linen',
    name: 'Linen',
    type: 'Natural Flax Fiber',
    description: 'Natural fabric known for its lightweight and textured appearance.',
    fullDescription: 'Linen is a textile made from the fibers of the flax plant. Known for extreme breathability, distinctive crisp texture, visible slub threads, and high natural luster.',
    image: '/samples/linen.png',
    features: {
      glcmContrast: 14.12,
      homogeneity: 0.38,
      dominantColor: 'Natural Beige / Flax',
      edgeDensity: 'High (Irregular Slubs)'
    }
  },
  {
    id: 'silk',
    name: 'Silk',
    type: 'Natural Protein Fiber',
    description: 'Natural protein-based fabric with a smooth and lustrous appearance.',
    fullDescription: 'Silk is a natural protein fiber produced by silkworms. Famous for its triangular prism-like structure which refracts incoming light at different angles, creating a shimmering satin sheen.',
    image: '/samples/silk.png',
    features: {
      glcmContrast: 0.85,
      homogeneity: 0.88,
      dominantColor: 'Soft Violet Satin',
      edgeDensity: 'Very Low (Smooth Surface)'
    }
  },
  {
    id: 'wool',
    name: 'Wool',
    type: 'Natural Animal Fiber',
    description: 'Natural animal fiber with a warm and characteristic textured surface.',
    fullDescription: 'Wool is a textile fiber obtained from sheep and other animals. Features crimped fibers creating air pockets for thermal insulation, uneven fuzzy surface depth, and rich tactile texture.',
    image: '/samples/wool.png',
    features: {
      glcmContrast: 18.60,
      homogeneity: 0.31,
      dominantColor: 'Heather Charcoal',
      edgeDensity: 'Very High (Fuzzy Fibers)'
    }
  }
];
