import type { Amount, Container, Material } from '@/types';
import { isDiscreteMaterial } from '@/types/material';


export function adjustValue(amount: Amount, material: Material, container: Container): Amount {
  let maxValue: number;
  
  if (isDiscreteMaterial(material)) {
    // For discrete materials like marbles, still limit to max capacity
    maxValue = container.maxMarbles || 0;
    return {
      value: Math.min(amount.value, maxValue),
      unit: amount.unit
    };
  } else {
    // For non-discrete materials (liquids), don't limit to max capacity
    return amount;
  }
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