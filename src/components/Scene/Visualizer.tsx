import type { Amount, Container as ContainerType, Material as MaterialType } from '@/types';
import { Glass } from './containers/Glass';

interface VisualizerProps {
  container: ContainerType;
  material: MaterialType;
  amount: Amount;
}

export function Visualizer({ container, material, amount }: VisualizerProps) {
  // Function to determine if a material-container combination is valid
  const isValidCombination = (container: ContainerType, material: MaterialType): boolean => {
    // Add logic for valid combinations
    // For example: marbles shouldn't go in spoons, etc.
    const validCombinations: Record<ContainerType, MaterialType[]> = {
      glass: ['water'], // expand this as needed
      spoon: ['water'], // expand this as needed
    };

    return validCombinations[container]?.includes(material) ?? false;
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