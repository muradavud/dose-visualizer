import type { Amount, MaterialSpecs } from '@/types';

export function convertToMl(amount: Amount, material: MaterialSpecs): number {
  if (amount.unit === 'ml') {
    return amount.value;
  }
  // Convert from grams to ml using material density
  return amount.value / material.density;
}

export function convertToGrams(amount: Amount, material: MaterialSpecs): number {
  if (amount.unit === 'g') {
    return amount.value;
  }
  // Convert from ml to grams using material density
  return amount.value * material.density;
} 