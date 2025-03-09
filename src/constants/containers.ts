import { ContainerSpecs } from '@/types';

export const CONTAINERS: Record<string, ContainerSpecs> = {
  glass: {
    id: 'glass',
    name: 'Glass',
    maxVolume: 250, // ml
    dimensions: {
      height: 15, // cm
      diameter: 7, // cm
    },
  },
}; 