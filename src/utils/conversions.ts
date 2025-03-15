import { UNITS } from '@/constants/units';
import type { Material, Unit } from '@/types';

export function roundToDecimalPlaces(value: number, decimalPlaces: number = 2): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(value * factor) / factor;
}

export function convertUnits(
  value: number, 
  fromUnit: Unit, 
  toUnit: Unit, 
  material?: Material
): number {
  if (fromUnit.type === toUnit.type) {
    return (value * fromUnit.conversionFactor) / toUnit.conversionFactor;
  }
  
  if (!material) {
    throw new Error('Material is required for conversions between different unit types');
  }
  
  if (fromUnit.type === 'volume' && toUnit.type === 'mass') {
    const volumeInMl = (value * fromUnit.conversionFactor) / UNITS.MILLILITER.conversionFactor;
    const massInGrams = volumeInMl * material.density;
    return massInGrams / toUnit.conversionFactor;
  }
  
  if (fromUnit.type === 'mass' && toUnit.type === 'volume') {
    const massInGrams = (value * fromUnit.conversionFactor) / UNITS.GRAM.conversionFactor;
    const volumeInMl = massInGrams / material.density;
    return volumeInMl / toUnit.conversionFactor;
  }
  
  throw new Error(`Conversion between ${fromUnit.type} and ${toUnit.type} is not supported`);
}