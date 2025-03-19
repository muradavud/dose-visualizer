import { CONTAINERS } from '@/constants';
import { Container, ContainerType } from '@/types';

interface ContainerSelectProps {
  value: Container;
  onChange: (container: Container) => void;
  useMetric?: boolean;
}

export function ContainerSelect({ value, onChange, useMetric = true }: ContainerSelectProps) {
  // Convert milliliters to fluid ounces
  const mlToFlOz = (ml: number) => {
    return (ml / 29.57).toFixed(1);
  };

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
          <option key={container.id} value={container.id} className="text-gray-900">
            {container.name} ({useMetric 
              ? `${container.maxVolume} mL` 
              : `${mlToFlOz(container.maxVolume)} fl oz`})
          </option>
        ))}
      </select>
    </div>
  );
} 