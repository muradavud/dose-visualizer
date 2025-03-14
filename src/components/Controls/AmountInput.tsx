import { UNITS, getUnitsByType } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { getMaxValue } from '@/utils/calculations';
import { convertUnits, roundToDecimalPlaces } from '@/utils/conversions';
import { useEffect, useMemo } from 'react';

interface AmountInputProps {
  value: Amount;
  onChange: (amount: Amount) => void;
  material: Material;
  container: Container;
}

export function AmountInput({ value, onChange, material, container }: AmountInputProps) {
  const shouldUseCountUnits = material.isDiscrete;

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

  // Synchronize units when material type changes
  useEffect(() => {
    if (shouldUseCountUnits && value.unit.type !== 'count') {
      onChange({ value: 0, unit: UNITS.COUNT });
    } else if (!shouldUseCountUnits && value.unit.type === 'count') {
      onChange({ value: 0, unit: UNITS.MILLILITER });
    }
  }, [shouldUseCountUnits, value.unit, onChange]);

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
          value={displayValue}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            const maxValue = getMaxValue(value, material, container);
            onChange({ 
              ...value, 
              value: Math.min(newValue, maxValue)
            });
          }}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          min="0"
          max={getMaxValue(value, material, container)}
          step={value.unit.step.toString()}
        />
          <select
            value={value.unit.id}
            disabled={shouldUseCountUnits}
            onChange={(e) => {
              const selectedUnit = Object.values(UNITS).find(unit => unit.id === e.target.value);
              if (selectedUnit) {
                // Convert the current value to the new unit to maintain the same actual amount
                let newValue = value.value;
                
                try {
                  newValue = convertUnits(value.value, value.unit, selectedUnit, material);
                } catch {
                  newValue = 0;
                }
                
                onChange({ 
                  value: newValue,
                  unit: selectedUnit 
                });
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