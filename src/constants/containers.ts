import { Container } from '@/types';

export const CONTAINERS: Record<string, Container> = {
  glass: {
    id: 'glass',
    containerType: 'glass',
    name: 'Glass',
    maxVolume: 250, // ml
    dimensions: {
      height: 15, // cm
      diameter: 7, // cm
    },
    modelPath: '/assets/models/glass_pokal_12oz.glb',
    insideModelPath: '/assets/models/glass_pokal_12oz_inside.glb',
    volumeMap: [
      { volume: 0, height: 0 },    // Empty
      { volume: 0.1, height: 0.3 }, // 10% volume = 30% height (narrow bottom)
      { volume: 0.3, height: 0.5 }, // 30% volume = 50% height
      { volume: 0.6, height: 0.7 }, // 60% volume = 70% height (wide middle)
      { volume: 1.0, height: 1.0 }  // Full
    ]
  },
}; 