import { CONTAINERS } from '@/constants';
import { Container } from '@/types';

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
        value={value}
        onChange={(e) => onChange(e.target.value as Container)}
        className="w-full rounded-md border border-gray-300 px-3 py-2"
      >
        {Object.values(CONTAINERS).map((container) => (
          <option key={container.id} value={container.id}>
            {container.name}
          </option>
        ))}
      </select>
    </div>
  );
} 