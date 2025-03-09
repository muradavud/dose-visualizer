export type Material = 'water' | 'marbles';
export type MaterialType = 'liquid' | 'marbles';

export interface MaterialSpecs {
  id: Material;
  type: MaterialType;
  name: string;
  density: number; // g/ml
  color: string;
  isDiscrete?: boolean; // For materials like marbles
  particleSize?: number; // For discrete materials, in mm
}


export interface Amount {
  value: number;
  unit: 'ml' | 'g' | 'count'; // Added count for discrete materials
} 