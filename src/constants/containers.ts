import { Container } from '@/types';

export const CONTAINERS: Record<string, Container> = {
  pokal_12oz: {
    id: 'pokal_12oz',
    containerType: 'glass',
    name: 'Ikea Pokal Glass',
    maxVolume: 350, // ml
    maxMarbles: 140, // count
    dimensions: {
      height: 14, // cm
      diameter: 9.5, // cm
    },
    modelPath: '/assets/models/glass_pokal_12oz.glb',
    insideModelPath: '/assets/models/glass_pokal_12oz_inside.glb',
    fullAt: 0.99, // Container is visually full at 100% height
    volumeMap: [
      {
        "volume": 0.0,
        "height": 0.0
      },
      {
        "volume": 0.07,
        "height": 0.11
      },
      {
        "volume": 0.15,
        "height": 0.22
      },
      {
        "volume": 0.24,
        "height": 0.33
      },
      {
        "volume": 0.33,
        "height": 0.44
      },
      {
        "volume": 0.44,
        "height": 0.56
      },
      {
        "volume": 0.56,
        "height": 0.67
      },
      {
        "volume": 0.7,
        "height": 0.78
      },
      {
        "volume": 0.84,
        "height": 0.89
      },
      {
        "volume": 1.0,
        "height": 1.0
      }
    ]
  },
  vardagen_15oz: {
    id: 'vardagen_15oz',
    containerType: 'glass',
    name: 'Ikea Vardagen Glass',
    maxVolume: 430,
    maxMarbles: 150,
    dimensions: {
      height: 13,
      diameter: 9.5,
    },
    modelPath: '/assets/models/glass_vardagen_15oz.glb',
    insideModelPath: '/assets/models/glass_vardagen_15oz_inside.glb',
    fullAt: 0.99, // Container is visually full at 100% height
    volumeMap: [
      {
        "volume": 0.0,
        "height": 0.0
      },
      {
        "volume": 0.08,
        "height": 0.11
      },
      {
        "volume": 0.17,
        "height": 0.22
      },
      {
        "volume": 0.27,
        "height": 0.33
      },
      {
        "volume": 0.38,
        "height": 0.44
      },
      {
        "volume": 0.49,
        "height": 0.56
      },
      {
        "volume": 0.61,
        "height": 0.67
      },
      {
        "volume": 0.73,
        "height": 0.78
      },
      {
        "volume": 0.86,
        "height": 0.89
      },
      {
        "volume": 1.0,
        "height": 1.0
      }
    ]
  },
  mopsig_tablespoon: {
    id: 'mopsig_tablespoon',
    containerType: 'glass',
    name: 'Tablespoon',
    maxVolume: 15,
    maxMarbles: 0,
    dimensions: {
      height: 3.5,
      diameter: 1.5,
    },
    modelPath: '/assets/models/spoon_mopsig.glb',
    insideModelPath: '/assets/models/spoon_mopsig_inside.glb',
    fullAt: 0.95, // Container is visually full at 100% height
    volumeMap: [
      {
        "volume": 0.0,
        "height": 0.0
      },
      {
        "volume": 0.01,
        "height": 0.11
      },
      {
        "volume": 0.06,
        "height": 0.22
      },
      {
        "volume": 0.12,
        "height": 0.33
      },
      {
        "volume": 0.21,
        "height": 0.44
      },
      {
        "volume": 0.33,
        "height": 0.56
      },
      {
        "volume": 0.46,
        "height": 0.67
      },
      {
        "volume": 0.62,
        "height": 0.78
      },
      {
        "volume": 0.8,
        "height": 0.89
      },
      {
        "volume": 1.0,
        "height": 1.0
      }
    ]
  },
  mopsig_teaspoon: {
    id: 'mopsig_teaspoon',
    containerType: 'glass',
    name: 'Teaspoon',
    maxVolume: 5,
    maxMarbles: 0,
    dimensions: {
      height: 3.5,
      diameter: 1.5,
    },
    modelPath: '/assets/models/teaspoon_mopsig.glb',
    insideModelPath: '/assets/models/teaspoon_mopsig_inside.glb',
    fullAt: 0.95, // Container is visually full at 100% height
    volumeMap: [
      {
        "volume": 0.0,
        "height": 0.0
      },
      {
        "volume": 0.01,
        "height": 0.11
      },
      {
        "volume": 0.06,
        "height": 0.22
      },
      {
        "volume": 0.12,
        "height": 0.33
      },
      {
        "volume": 0.22,
        "height": 0.44
      },
      {
        "volume": 0.33,
        "height": 0.56
      },
      {
        "volume": 0.47,
        "height": 0.67
      },
      {
        "volume": 0.62,
        "height": 0.78
      },
      {
        "volume": 0.8,
        "height": 0.89
      },
      {
        "volume": 1.0,
        "height": 1.0
      }
    ]
  }
};
