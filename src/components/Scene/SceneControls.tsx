import type { Amount, Container, Material } from '@/types';
import { adjustValue } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
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
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 flex gap-2 justify-center w-[95vw]">
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-1 shadow-lg flex-1 max-w-[45vw]" style={{minWidth: "140px"}}>
          <ContainerSelect 
            value={container} 
            onChange={handleContainerChange}
          />
        </div>
        <div className="bg-white/30 backdrop-blur-sm rounded-lg p-1 shadow-lg flex-1 max-w-[45vw]" style={{minWidth: "140px"}}>
          <MaterialSelect 
            value={material} 
            onChange={handleMaterialChange} 
          />
        </div>
      </div>
      
      {/* Right side: Reset and Banana buttons */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4">
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
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
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