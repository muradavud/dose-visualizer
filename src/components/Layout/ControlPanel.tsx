import type { Amount, Container, Material } from '@/types';
import { adjustValue } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
import { AmountInput } from '../controls/AmountInput';
import { ContainerSelect } from '../controls/ContainerSelect';
import { MaterialSelect } from '../controls/MaterialSelect';
import { Button } from '../ui/Button';

interface ControlPanelProps {
  container: Container;
  material: Material;
  amount: Amount;
  showBanana: boolean;
  onContainerChange: (container: Container) => void;
  onMaterialChange: (material: Material) => void;
  onAmountChange: (amount: Amount) => void;
  onToggleBanana: () => void;
}

export function ControlPanel({
  container,
  material,
  amount,
  showBanana,
  onContainerChange,
  onMaterialChange,
  onAmountChange,
  onToggleBanana,
}: ControlPanelProps) {
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
    <div className="w-full p-4 bg-white border-t">
      <div className="flex gap-4 max-w-3xl mx-auto">
        <ContainerSelect value={container} onChange={handleContainerChange} />
        <MaterialSelect value={material} onChange={handleMaterialChange} />
        <AmountInput 
          value={amount} 
          onChange={handleAmountChange} 
          material={material} 
        />
        <Button
          variant={showBanana ? "default" : "outline"}
          onClick={onToggleBanana}
        >
          Banana
        </Button>
      </div>
    </div>
  );
} 