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
    density: 2.16, 
    color: '#f2f2f2',
    fresnelIntensity: 0
  },
  mercury: {
    id: 'mercury',
    type: 'liquid',
    name: 'Mercury',
    density: 13.6, 
    color: '#c0c0c0',
    fresnelIntensity: 0.8
  },
  honey: {
    id: 'honey',
    type: 'liquid',
    name: 'Honey',
    density: 1.42, 
    color: '#ffd700',
    fresnelIntensity: 0.4
  },
  sand: {
    id: 'sand',
    type: 'granular',
    name: 'Sand',
    density: 1.6, 
    color: '#c2b280',
    fresnelIntensity: 0
  },
  coffee: {
    id: 'coffee',
    type: 'granular',
    name: 'Coffee Grounds',
    density: 0.4, 
    color: '#4a2c2a',
    fresnelIntensity: 0
  },
  oil: {
    id: 'oil',
    type: 'liquid',
    name: 'Olive Oil',
    density: 0.92, 
    color: '#8b8000',
    fresnelIntensity: 0.3
  },
  milk: {
    id: 'milk',
    type: 'liquid',
    name: 'Milk',
    density: 1.03, 
    color: '#fffafa',
    fresnelIntensity: 0.15
  },
  sugar: {
    id: 'sugar',
    type: 'granular',
    name: 'Sugar',
    density: 1.59, 
    color: '#ffffff',
    fresnelIntensity: 0
  },
  rice: {
    id: 'rice',
    type: 'granular',
    name: 'Rice',
    density: 0.85, 
    color: '#f5f5dc',
    fresnelIntensity: 0
  },
  ethanol: {
    id: 'ethanol',
    type: 'liquid',
    name: 'Ethanol',
    density: 0.79, 
    color: '#f5f5f5',
    fresnelIntensity: 0.35
  },
  gasoline: {
    id: 'gasoline',
    type: 'liquid',
    name: 'Gasoline',
    density: 0.75, 
    color: '#ffda75',
    fresnelIntensity: 0.4
  },
  blood: {
    id: 'blood',
    type: 'liquid',
    name: 'Blood',
    density: 1.06,  
    color: '#8a0303',
    fresnelIntensity: 0.25
  },
  flour: {
    id: 'flour',
    type: 'granular',
    name: 'Flour',
    density: 0.59, 
    color: '#f5f3e6',
    fresnelIntensity: 0
  },
  marbles: {
    id: 'marbles',
    type: 'marbles',
    name: 'Marbles',
    density: 0, 
    color: '#808080',
  },
};
