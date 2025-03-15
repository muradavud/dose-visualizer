import { UNITS, getUnitsByType } from '@/constants/units';
import type { Amount, Material } from '@/types';
import { isDiscreteMaterial } from '@/types/material';
import { roundToDecimalPlaces } from '@/utils/conversions';
import { useMemo } from 'react';

interface AmountInputProps {
  value: Amount;
  onChange: (amount: Amount) => void;
  material: Material;
}

export function AmountInput({ value, onChange, material }: AmountInputProps) {
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
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          min="0"
          step={value.unit.step.toString()}
        />
          <select
            value={value.unit.id}
            disabled={shouldUseCountUnits}
            onChange={(e) => {
              const selectedUnit = Object.values(UNITS).find(unit => unit.id === e.target.value);
              if (selectedUnit) {
                onChange({ ...value, unit: selectedUnit });
              }
            }}
            className="w-24 rounded-md border border-gray-300 px-2 py-2 text-gray-900 bg-white"
          >
            {availableUnits.map(unit => (
              <option key={unit.id} value={unit.id} className="text-gray-900">
                {unit.symbol}
              </option>
            ))}
          </select>
      </div>
    </div>
  );
} 