import { UNITS } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { convertUnits } from '@/utils/conversions';
import { Html } from '@react-three/drei';

interface OverflowIndicatorProps {
  amount: Amount;
  container: Container;
  material: Material;
}

export function OverflowIndicator({ amount, container, material }: OverflowIndicatorProps) {
  // Convert amount to milliliters for volume calculation
  const amountInMl = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
  const containerMax = container.maxVolume;
  
  const containerHeight = container.dimensions?.height || 15;
  const offset = 4;
  
  // Calculate how many containers this would fill
  const containerCount = Math.floor(amountInMl / containerMax);
  
  // Only show if we have overflow (more than 1 container)
  if (containerCount < 1) return null;
  
  return (
    <Html position={[0, ((containerHeight + offset) / 100), 0]} center>
      <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-blue-200 min-w-[130px]">
        <div className="text-sm font-bold text-center text-blue-600">
          {containerCount + 1}x <br />
          <span className="text-xs font-medium text-blue-500">{container.name}</span>
        </div>
        <div className="text-xs text-center text-gray-600 mt-1">
          {Math.round(amountInMl)}mL total
        </div>
      </div>
    </Html>
  );
} 