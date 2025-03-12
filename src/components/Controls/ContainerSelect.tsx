import { CONTAINERS } from '@/constants';
import { Container, ContainerType } from '@/types';

interface ContainerSelectProps {
  value: Container;
  onChange: (container: Container) => void;
}

export function ContainerSelect({ value, onChange }: ContainerSelectProps) {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Container
      </label>
      <select
        value={value.id}
        onChange={(e) => onChange(CONTAINERS[e.target.value as ContainerType])}
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
      >
        {Object.values(CONTAINERS).map((container) => (
          <option key={container.id} value={container.name} className="text-gray-900">
            {container.name}
          </option>
        ))}
      </select>
    </div>
  );
} 