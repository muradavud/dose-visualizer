import type { Amount } from '@/types';

interface AmountInputProps {
  value: Amount;
  onChange: (amount: Amount) => void;
}

export function AmountInput({ value, onChange }: AmountInputProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Amount
      </label>
      <div className="flex gap-2">
        <input
          type="number"
          value={value.value}
          onChange={(e) => onChange({ ...value, value: Number(e.target.value) })}
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
          min="0"
          step="0.1"
        />
        <select
          value={value.unit}
          onChange={(e) => onChange({ ...value, unit: e.target.value as 'ml' | 'g' })}
          className="w-20 rounded-md border border-gray-300 px-2 py-2 text-gray-900 bg-white"
        >
          <option value="ml" className="text-gray-900">ml</option>
          <option value="g" className="text-gray-900">g</option>
        </select>
      </div>
    </div>
  );
} 