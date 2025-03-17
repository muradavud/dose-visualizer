import { Container } from '@/types';

export const DEFAULT_CONTAINER = 'pokal_12oz';

export const CONTAINERS: Record<string, Container> = {
  pokal_12oz: {
    id: 'pokal_12oz',
    containerType: 'glass',
    name: 'Pokal 12oz',
    maxVolume: 350, // ml
    maxMarbles: 120, // count
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
  vardagen_15oz: {
    id: 'vardagen_15oz',
    containerType: 'glass',
    name: 'Glass Vardagen 15oz',
    maxVolume: 430, // ml
    maxMarbles: 120, // count
    dimensions: {
      height: 15, // cm
      diameter: 7, // cm
    },
    modelPath: '/assets/models/glass_vardagen_15oz.glb',
    insideModelPath: '/assets/models/glass_vardagen_15oz_inside.glb',
    volumeMap: [
      { volume: 0, height: 0 },    // Empty
      { volume: 0.1, height: 0.3 }, // 10% volume = 30% height (narrow bottom)
      { volume: 0.3, height: 0.5 }, // 30% volume = 50% height
      { volume: 0.6, height: 0.7 }, // 60% volume = 70% height (wide middle)
      { volume: 1.0, height: 1.0 }  // Full
    ]
  },
  mopsig_tablespoon: {
    id: 'mopsig_tablespoon',
    containerType: 'glass',
    name: 'Mopsig Tablespoon',
    maxVolume: 100, // ml
    maxMarbles: 0, // count
    dimensions: {
      height: 15, // cm
      diameter: 7, // cm
    },
    modelPath: '/assets/models/spoon_mopsig.glb',
    insideModelPath: '/assets/models/spoon_mopsig_inside.glb',
    volumeMap: [
      { volume: 0, height: 0 },    // Empty
      { volume: 0.1, height: 0.3 }, // 10% volume = 30% height (narrow bottom)
      { volume: 0.3, height: 0.5 }, // 30% volume = 50% height
      { volume: 0.6, height: 0.7 }, // 60% volume = 70% height (wide middle)
      { volume: 1.0, height: 1.0 }  // Full
    ]
  },
  mopsig_teaspoon: {
    id: 'mopsig_teaspoon',
    containerType: 'glass',
    name: 'Mopsig Teaspoon',
    maxVolume: 100, // ml
    maxMarbles: 0, // count
    dimensions: {
      height: 15, // cm
      diameter: 7, // cm
    },
    modelPath: '/assets/models/teaspoon_mopsig.glb',
    insideModelPath: '/assets/models/teaspoon_mopsig_inside.glb',
    volumeMap: [
      { volume: 0, height: 0 },    // Empty
      { volume: 0.1, height: 0.3 }, // 10% volume = 30% height (narrow bottom)
      { volume: 0.3, height: 0.5 }, // 30% volume = 50% height
      { volume: 0.6, height: 0.7 }, // 60% volume = 70% height (wide middle)
      { volume: 1.0, height: 1.0 }  // Full
    ]
  }

}; 