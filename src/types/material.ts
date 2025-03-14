export type MaterialType = 'liquid' | 'marbles';

export interface Material {
  id: string;
  type: MaterialType;
  name: string;
  density: number; // g/ml
  color: string;
  isDiscrete: boolean; // For materials like marbles
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