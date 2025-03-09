import { MaterialSpecs } from '@/types';

export const MATERIALS: Record<string, MaterialSpecs> = {
  water: {
    id: 'water',
    name: 'Water',
    density: 1.0, // g/ml
    color: '#add8e6',
  },
  marbles: {
    id: 'marbles',
    name: 'Marbles',
    density: 2.6, // g/ml
    color: '#808080',
  },
}; 