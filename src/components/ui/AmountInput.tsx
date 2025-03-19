import { UNITS, getUnitsByType } from '@/constants/units';
import type { Amount, Material } from '@/types';
import { isDiscreteMaterial } from '@/types/material';
import { convertUnits, roundToDecimalPlaces } from '@/utils/conversions';
import Image from 'next/image';
import { useMemo, useState } from 'react';

interface AmountInputProps {
  value: Amount;
  onChange: (amount: Amount) => void;
  material: Material;
}

export function AmountInput({ value, onChange, material }: AmountInputProps) {
  const [showDualInput, setShowDualInput] = useState(false);
  const shouldUseCountUnits = useMemo(() => isDiscreteMaterial(material), [material]);

  const availableUnits = useMemo(() => {
    // For non-discrete materials, show both volume and mass units
    if (!shouldUseCountUnits) {
      const volumeUnits = getUnitsByType('volume');
      const massUnits = getUnitsByType('mass');
      return [...volumeUnits, ...massUnits];
    }
    // For discrete materials, only count units are used
    return getUnitsByType('count');
  }, [shouldUseCountUnits]);

  // Format the displayed value with appropriate decimal places from the unit
  const displayValue = value.unit.type === 'count' 
    ? Math.round(value.value) 
    : roundToDecimalPlaces(value.value, value.unit.decimalPlaces);

  // For the secondary input (when showing dual input)
  const [secondaryUnit, setSecondaryUnit] = useState(() => {
    // Default to a different unit type than the primary if possible
    const primaryType = value.unit.type;
    if (primaryType === 'volume' && !shouldUseCountUnits) {
      const massUnits = getUnitsByType('mass');
      return massUnits[0];
    } else if (primaryType === 'mass' && !shouldUseCountUnits) {
      const volumeUnits = getUnitsByType('volume');
      return volumeUnits[0];
    } else {
      // Fallback or for count units
      return availableUnits.find(u => u.id !== value.unit.id) || value.unit;
    }
  });

  // Calculate converted value for secondary input
  const secondaryValue = useMemo(() => {
    try {
      return roundToDecimalPlaces(
        convertUnits(value.value, value.unit, secondaryUnit, material),
        secondaryUnit.decimalPlaces
      );
    } catch (error) {
      console.error('Error converting units:', error);
      return 0;
    }
  }, [value.value, value.unit, secondaryUnit, material]);

  const handleSecondaryValueChange = (newValue: number) => {
    try {
      // Convert from secondary to primary
      const convertedValue = convertUnits(newValue, secondaryUnit, value.unit, material);
      onChange({ ...value, value: convertedValue });
    } catch (error) {
      console.error('Error converting units:', error);
    }
  };

  const handleSecondaryUnitChange = (unitId: string) => {
    const selectedUnit = Object.values(UNITS).find(unit => unit.id === unitId);
    if (selectedUnit) {
      setSecondaryUnit(selectedUnit);
    }
  };

  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          inputMode="decimal"
          value={displayValue}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            onChange({ ...value, value: newValue });
          }}
          className="w-[40%] rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          min="0"
          step={value.unit.step.toString()}
        />
        <div className="flex w-[60%]">
          <select
            value={value.unit.id}
            disabled={shouldUseCountUnits}
            onChange={(e) => {
              const selectedUnit = Object.values(UNITS).find(unit => unit.id === e.target.value);
              if (selectedUnit) {
                onChange({ ...value, unit: selectedUnit });
              }
            }}
            className="w-[90%] rounded-l-md border border-gray-300 px-2 py-2 text-gray-900 bg-white"
          >
            {availableUnits.map(unit => (
              <option key={unit.id} value={unit.id} className="text-gray-900">
                {unit.symbol} | {unit.name}
              </option>
            ))}
          </select>
          {!shouldUseCountUnits && (
            <button 
              className="w-[10%] min-w-[40px] flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white text-gray-700 px-2"
              onClick={() => setShowDualInput(!showDualInput)}
              aria-label="Toggle unit conversion"
            >
              <Image 
                src="/assets/ui/convert.svg" 
                alt="Convert" 
                width={20} 
                height={20} 
              />
            </button>
          )}
        </div>
      </div>
      
      {showDualInput && !shouldUseCountUnits && (
        <div className="flex gap-2 mt-2">
          <input
            type="number"
            inputMode="decimal"
            value={secondaryValue}
            onChange={(e) => {
              const newValue = Number(e.target.value);
              handleSecondaryValueChange(newValue);
            }}
            className="w-[40%] rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
            min="0"
            step={secondaryUnit.step.toString()}
          />
          <select
            value={secondaryUnit.id}
            onChange={(e) => handleSecondaryUnitChange(e.target.value)}
            className="w-[60%] rounded-md border border-gray-300 px-2 py-2 text-gray-900 bg-white"
          >
            {availableUnits.map(unit => (
              <option key={unit.id} value={unit.id} className="text-gray-900">
                {unit.symbol} | {unit.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
} 