import { UNITS } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { isDiscreteMaterial } from '@/types/material';
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
 * Adjusts an amount to ensure it doesn't exceed the maximum allowed by the container
 * Returns a new Amount object with the adjusted value and the same unit as the input
 */
export function adjustValue(amount: Amount, material: Material, container: Container): Amount {
  let maxValue: number;
  
  if (isDiscreteMaterial(material)) {
    maxValue = container.maxMarbles || 0;
  } else {
    // For liquids
    if (amount.unit.type === 'volume') {
      // Convert maxVolume (in mL) to the current volume unit
      maxValue = convertUnits(container.maxVolume, UNITS.MILLILITER, amount.unit, material);
    } else if (amount.unit.type === 'mass') {
      // Convert maxVolume to grams using density, then to the current mass unit
      const maxMassInGrams = container.maxVolume * material.density;
      maxValue = convertUnits(maxMassInGrams, UNITS.GRAM, amount.unit, material);
    } else {
      maxValue = container.maxVolume;
    }
  }
  
  return {
    value: Math.min(amount.value, maxValue),
    unit: amount.unit
  };
}

export function getHeightForVolume(volumeRatio: number, container: Container): number {
  const { volumeMap } = container;
  
  // If volumeMap is not present or empty, use 1:1 ratio
  if (!volumeMap || volumeMap.length < 2) {
    return volumeRatio;
  }
  
  // Find the two mapping points we're between
  for (let i = 0; i < volumeMap.length - 1; i++) {
    if (volumeRatio <= volumeMap[i + 1].volume) {
      const lower = volumeMap[i];
      const upper = volumeMap[i + 1];
      
      // Interpolate between the two points
      const ratio = (volumeRatio - lower.volume) / (upper.volume - lower.volume);
      return lower.height + (upper.height - lower.height) * ratio;
    }
  }
  return 1.0;
} 