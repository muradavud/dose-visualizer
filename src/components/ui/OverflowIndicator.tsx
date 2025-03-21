import { UNITS } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { convertUnits } from '@/utils/conversions';
import { Html } from '@react-three/drei';
import { useState } from 'react';

interface OverflowIndicatorProps {
  amount: Amount;
  container: Container;
  material: Material;
}

export function OverflowIndicator({ amount, container, material }: OverflowIndicatorProps) {
  const [expanded, setExpanded] = useState(true);
  
  // Convert amount to milliliters for volume calculation
  const amountInMl = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
  const containerMax = container.maxVolume;
  
  const containerHeight = container.dimensions?.height || 15;
  const offset = 5;
  
  // Calculate how many containers this would fill
  const containerCount = Math.floor(amountInMl / containerMax);
  
  // Calculate the remaining amount in milliliters
  const remainingAmountInMl = amountInMl % containerMax;
  
  // Convert the remaining amount back to the original unit
  const remainingAmount = Math.round(convertUnits(remainingAmountInMl, UNITS.MILLILITER, amount.unit, material) * 10) / 10;
  
  // Only show if we have overflow (more than 1 container)
  if (containerCount < 1) return null;
  
  return (
    <Html position={[0, ((containerHeight + offset) / 100), 0.0]} center zIndexRange={[0, 0]}>
      {expanded ? (
        <div 
          className="bg-white/40 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-blue-500/80 min-w-[120px] flex flex-col items-center cursor-pointer"
          onClick={() => setExpanded(false)}
        >
          <div className="text-2xl font-bold text-center text-red-400 whitespace-nowrap">
            {containerCount} X
          </div>
          <div className="text-2xl font-bold text-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </div>
          <div className="text-1xl text-center text-blue-500">
            {remainingAmount} {amount.unit.symbol}
          </div>
        </div>
      ) : (
        <div 
          className="bg-white/40 backdrop-blur-sm p-2 rounded-full shadow-lg border border-blue-500/80 cursor-pointer"
          onClick={() => setExpanded(true)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-700">
            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        </div>
      )}
    </Html>
  );
} 