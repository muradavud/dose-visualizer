import { MATERIALS } from '@/constants';
import { Material, MaterialType } from '@/types';
import { useState } from 'react';
import { ColorPicker } from './ColorPicker';
import { Modal } from './Modal';

interface MaterialSelectProps {
  value: Material;
  onChange: (material: Material) => void;
}

export function MaterialSelect({ value, onChange }: MaterialSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMaterial, setNewMaterial] = useState({
    name: '',
    density: 1.0,
    color: '#add8e6',
  });

  const handleAddMaterial = () => {
    const id = newMaterial.name.toLowerCase().replace(/\s+/g, '-');
    const material: Material = {
      id,
      ...newMaterial,
      type: 'liquid',
      fresnelIntensity: 0
    };
    
    // Add to MATERIALS constant
    (MATERIALS as Record<string, Material>)[id] = material;
    
    // Select the new material
    onChange(material);
    
    // Reset form and close modal
    setNewMaterial({
      name: '',
      density: 1.0,
      color: '#add8e6',
    });
    setIsModalOpen(false);
  };

  const handleDensityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === '') {
      setNewMaterial({ ...newMaterial, density: 0 });
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        setNewMaterial({ ...newMaterial, density: numValue });
      }
    }
  };

  return (
    <>
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Material
        </label>
        <div className="flex gap-2">
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
          <button
            onClick={() => setIsModalOpen(true)}
            className="rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Material"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={newMaterial.name}
              onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              placeholder="Enter material name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Density (g/ml)
            </label>
            <input
              type="number"
              value={newMaterial.density.toString()}
              onChange={handleDensityChange}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-white"
              step="0.1"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Color
            </label>
            <ColorPicker
              value={newMaterial.color}
              onChange={(color) => setNewMaterial({ ...newMaterial, color })}
            />
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-600 sm:ml-3 sm:w-auto"
              onClick={handleAddMaterial}
              disabled={!newMaterial.name}
            >
              Add Material
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
} 