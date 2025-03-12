import type { Amount, Container, Material } from '@/types';
import { AmountInput } from '../Controls/AmountInput';
import { ContainerSelect } from '../Controls/ContainerSelect';
import { MaterialSelect } from '../Controls/MaterialSelect';

interface ControlPanelProps {
  container: Container;
  material: Material;
  amount: Amount;
  onContainerChange: (container: Container) => void;
  onMaterialChange: (material: Material) => void;
  onAmountChange: (amount: Amount) => void;
}

export function ControlPanel({
  container,
  material,
  amount,
  onContainerChange,
  onMaterialChange,
  onAmountChange,
}: ControlPanelProps) {
  return (
    <div className="w-full p-4 bg-white border-t">
      <div className="flex gap-4 max-w-3xl mx-auto">
        <ContainerSelect value={container} onChange={onContainerChange} />
        <MaterialSelect value={material} onChange={onMaterialChange} />
        <AmountInput value={amount} onChange={onAmountChange} material={material} />
      </div>
    </div>
  );
} 