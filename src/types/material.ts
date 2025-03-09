export type MaterialType = 'water' | 'marbles';

export interface MaterialSpecs {
  id: MaterialType;
  name: string;
  density: number; // g/ml
  color: string;
  isDiscrete?: boolean; // For materials like marbles
  particleSize?: number; // For discrete materials, in mm
}

export type Material = MaterialType;

export interface Amount {
  value: number;
  unit: 'ml' | 'g' | 'count'; // Added count for discrete materials
} 