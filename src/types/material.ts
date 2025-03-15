export type MaterialType = 'liquid' | 'marbles' | 'granular';

export interface Material {
  id: string;
  type: MaterialType;
  name: string;
  density: number; // g/ml
  color: string;
}

// Utility function to check if a material is discrete
export function isDiscreteMaterial(material: Material): boolean {
  return material.type === 'marbles';
}

// Unit system with conversion factors
export type UnitType = 'volume' | 'mass' | 'count';

export interface Unit {
  id: string;
  name: string;
  type: UnitType;
  conversionFactor: number; // Relative to base unit (mL for volume, g for mass)
  symbol: string;
  decimalPlaces: number; // Number of decimal places to display
  step: number; // Step size for input controls
}

export interface Amount {
  value: number;
  unit: Unit;
} 