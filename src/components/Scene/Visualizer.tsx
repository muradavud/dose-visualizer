import { MATERIALS } from '@/constants/materials';
import type { Amount, Container as ContainerType, Material, MaterialType } from '@/types';
import { Glass } from './containers/Glass';

interface VisualizerProps {
  container: ContainerType;
  material: Material;
  amount: Amount;
}

export function Visualizer({ container, material, amount }: VisualizerProps) {
  // Function to determine if a material-container combination is valid
  const isValidCombination = (container: ContainerType, material: Material): boolean => {
    const materialSpec = MATERIALS[material];
    if (!materialSpec) return false;

    // Add logic for valid combinations based on material type
    const validCombinations: Record<ContainerType, MaterialType[]> = {
      glass: ['liquid', 'marbles'], // glass can hold both liquid and marbles
      spoon: ['liquid'], // spoon can only hold liquids
    };

    return validCombinations[container]?.includes(materialSpec.type) ?? false;
  };

  // Render appropriate container-material combination
  const renderVisualization = () => {
    if (!isValidCombination(container, material)) {
      console.warn(`Invalid combination: ${container} with ${material}`);
      return null;
    }

    switch (container) {
      case 'glass':
        return <Glass material={material} amount={amount} />;
      case 'spoon':
        // return <Spoon material={material} amount={amount} />;
        return null;
      default:
        console.warn(`Unknown container type: ${container}`);
        return null;
    }
  };

  return (
    <group>
      {renderVisualization()}
    </group>
  );
} 