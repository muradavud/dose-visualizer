import { UNITS } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { convertUnits } from './conversions';

export function calculateFillHeight(
  amount: Amount,
  container: Container,
  material: Material
): number {
  // Convert amount to ml if necessary
  const volumeInMl = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
  
  // Calculate the height based on volume and container dimensions
  const radius = container.dimensions.diameter / 2;
  const area = Math.PI * radius * radius;
  const height = volumeInMl / area;
  
  return Math.min(height, container.dimensions.height);
}

/**
 * Calculate the maximum allowed value for an amount input based on material type and container
 */
export function getMaxValue(value: Amount, material: Material, container: Container): number {
  if (material.isDiscrete) {
    return container.maxMarbles || 0;
  } else {
    // For liquids
    if (value.unit.type === 'volume') {
      // Convert maxVolume (in mL) to the current volume unit
      return convertUnits(container.maxVolume, UNITS.MILLILITER, value.unit, material);
    } else if (value.unit.type === 'mass') {
      // Convert maxVolume to grams using density, then to the current mass unit
      const maxMassInGrams = container.maxVolume * material.density;
      return convertUnits(maxMassInGrams, UNITS.GRAM, value.unit, material);
    }
    return container.maxVolume;
  }
} 