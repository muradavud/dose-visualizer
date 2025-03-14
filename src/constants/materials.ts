import { Material } from '@/types';

export const DEFAULT_MATERIAL = 'water';

export const MATERIALS: Record<string, Material> = {
  water: {
    id: 'water',
    type: 'liquid',
    name: 'Water',
    density: 1.0, // g/ml
    color: '#add8e6',
  },
  marbles: {
    id: 'marbles',
    type: 'marbles',
    name: 'Marbles',
    density: 2.6, // g/ml
    color: '#808080',
  },
}; 