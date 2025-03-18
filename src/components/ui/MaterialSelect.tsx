import { MATERIALS } from '@/constants';
import { Material, MaterialType } from '@/types';

interface MaterialSelectProps {
  value: Material;
  onChange: (material: Material) => void;
}

export function MaterialSelect({ value, onChange }: MaterialSelectProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Material
      </label>
      <select
        value={value.id}
        onChange={(e) => onChange(MATERIALS[e.target.value as MaterialType])}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
      >
        {Object.values(MATERIALS).map((material) => (
          <option key={material.id} value={material.id} className="text-gray-900">
            {material.name}
          </option>
        ))}
      </select>
    </div>
  );
} 