import type { Amount, Container, Material } from '@/types';
import { adjustValue } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
import { useState } from 'react';
import { AmountInput } from '../ui/AmountInput';
import { ContainerSelect } from '../ui/ContainerSelect';
import { MaterialSelect } from '../ui/MaterialSelect';
import { RoundButton } from '../ui/RoundButton';

/**
 * Controls specifically for the 3D scene including scene manipulations
 * and material/container controls
 */

interface SceneControlsProps {
  // Scene manipulation props
  onResetView: () => void;
  
  // Material/container control props
  container: Container;
  material: Material;
  amount: Amount;
  showBanana: boolean;
  onContainerChange: (container: Container) => void;
  onMaterialChange: (material: Material) => void;
  onAmountChange: (amount: Amount) => void;
  onToggleBanana: () => void;
}

export function SceneControls({
  // Scene manipulation props
  onResetView,
  
  // Material/container control props
  container,
  material,
  amount,
  showBanana,
  onContainerChange,
  onMaterialChange,
  onAmountChange,
  onToggleBanana,
}: SceneControlsProps) {
  // State for unit system preference
  const [useMetric, setUseMetric] = useState(true);
  
  // Handle container changes
  const handleContainerChange = (newContainer: Container) => {
    // Adjust the current amount to ensure it doesn't exceed the new container's capacity
    const adjustedAmount = adjustValue(amount, material, newContainer);
    onAmountChange(adjustedAmount);
    onContainerChange(newContainer);
  };

  // Handle material changes
  const handleMaterialChange = (newMaterial: Material) => {
    const adjustedAmount = adjustValue(amount, newMaterial, container);
    onAmountChange(adjustedAmount);
    onMaterialChange(newMaterial);
  };

  // Handle amount changes
  const handleAmountChange = (newAmount: Amount) => {
    // Handle unit conversion if the unit has changed
    if (newAmount.unit.id !== amount.unit.id) {
      try {
        // Convert the value to the new unit
        const newValue = convertUnits(amount.value, amount.unit, newAmount.unit, material);
        newAmount = { ...newAmount, value: newValue };
      } catch (error) {
        console.error('Error converting units:', error);
      }
    }
    
    // Adjust the amount to ensure it doesn't exceed container capacity
    const adjustedAmount = adjustValue(newAmount, material, container);
    onAmountChange(adjustedAmount);
  };

  return (
    <>
      {/* Top controls: Container and Material selectors - centered */}
      <div className="fixed top-4 left-4 right-4 z-50 flex gap-2">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-1 shadow-lg w-1/2">
          <ContainerSelect 
            value={container} 
            onChange={handleContainerChange}
            useMetric={useMetric}
          />
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-1 shadow-lg w-1/2">
          <MaterialSelect 
            value={material} 
            onChange={handleMaterialChange} 
          />
        </div>
      </div>
      
      {/* Unit system toggle - upper left below container */}
      <div className="fixed top-26 left-4 z-50">
        <div className="flex flex-col bg-white/30 backdrop-blur-sm rounded-md p-1 shadow-sm">
          <button 
            className={`w-10 h-8 text-xs font-medium rounded-t-md flex items-center justify-center ${useMetric ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setUseMetric(true)}
            aria-label="Use metric units"
          >
            mL
          </button>
          <button 
            className={`w-10 h-8 text-xs font-medium rounded-b-md flex items-center justify-center ${!useMetric ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => setUseMetric(false)}
            aria-label="Use imperial units"
          >
            oz
          </button>
        </div>
      </div>
      
      {/* Right side: Reset and Banana buttons */}
      <div className="fixed right-4 top-26 z-50 flex flex-col gap-2">
        <RoundButton
          variant="camera"
          onClick={onResetView}
          aria-label="Reset View"
        />
        <RoundButton
          variant="banana"
          isActive={showBanana}
          onClick={onToggleBanana}
          aria-label="Toggle Banana"
        />
      </div>
      
      {/* Bottom: Amount input */}
      <div className="fixed bottom-4 left-4 right-4 z-50">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-2 shadow-lg">
          <AmountInput 
            value={amount} 
            onChange={handleAmountChange} 
            material={material} 
          />
        </div>
      </div>
    </>
  );
} 