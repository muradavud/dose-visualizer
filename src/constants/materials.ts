import { Material } from '@/types';

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
  mercury: {
    id: 'mercury',
    type: 'liquid',
    name: 'Mercury',
    density: 13.6, // g/ml
    color: '#c0c0c0',
    fresnelIntensity: 0.8
  },
  honey: {
    id: 'honey',
    type: 'liquid',
    name: 'Honey',
    density: 1.42, // g/ml
    color: '#ffd700',
    fresnelIntensity: 0.4
  },
  sand: {
    id: 'sand',
    type: 'granular',
    name: 'Sand',
    density: 1.6, // g/ml
    color: '#c2b280',
    fresnelIntensity: 0
  },
  coffee: {
    id: 'coffee',
    type: 'granular',
    name: 'Coffee Grounds',
    density: 0.4, // g/ml
    color: '#4a2c2a',
    fresnelIntensity: 0
  },
  oil: {
    id: 'oil',
    type: 'liquid',
    name: 'Olive Oil',
    density: 0.92, // g/ml
    color: '#8b8000',
    fresnelIntensity: 0.3
  },
  milk: {
    id: 'milk',
    type: 'liquid',
    name: 'Milk',
    density: 1.03, // g/ml
    color: '#fffafa',
    fresnelIntensity: 0.15
  },
  sugar: {
    id: 'sugar',
    type: 'granular',
    name: 'Sugar',
    density: 1.59, // g/ml
    color: '#ffffff',
    fresnelIntensity: 0
  },
  rice: {
    id: 'rice',
    type: 'granular',
    name: 'Rice',
    density: 0.85, // g/ml
    color: '#f5f5dc',
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
