import { Material } from '@/types';

export const DEFAULT_MATERIAL = 'water';

export const MATERIALS: Record<string, Material> = {
  water: {
    id: 'water',
    type: 'liquid',
    name: 'Water',
    density: 1.0, // g/ml
    color: '#add8e6',
    fresnelIntensity: 0.25
  },
  salt: {
    id: 'salt',
    type: 'granular',
    name: 'Salt',
    density: 2.16, // g/ml
    color: '#f2f2f2',
    fresnelIntensity: 0
  },
  marbles: {
    id: 'marbles',
    type: 'marbles',
    name: 'Marbles',
    density: 0, // g/ml
    color: '#808080',
  },
};
