import type { Amount, Container, MaterialSpecs } from '@/types';
import { convertToMl } from './conversions';

export function calculateFillHeight(
  amount: Amount,
  container: Container,
  material: MaterialSpecs
): number {
  // Convert amount to ml if necessary
  const volumeInMl = convertToMl(amount, material);
  
  // Calculate the height based on volume and container dimensions
  const radius = container.dimensions.diameter / 2;
  const area = Math.PI * radius * radius;
  const height = volumeInMl / area;
  
  return Math.min(height, container.dimensions.height);
} 