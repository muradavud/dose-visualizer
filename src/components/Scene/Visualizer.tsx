import type { Amount, Container, ContainerType, Material, MaterialType } from '@/types';
import { Suspense } from 'react';
import { Glass } from './containers/Glass';
import { LoadingIndicator } from './LoadingIndicator';

interface VisualizerProps {
  container: Container;
  material: Material;
  amount: Amount;
}

export function Visualizer({ container, material, amount }: VisualizerProps) {
  // Function to determine if a material-container combination is valid
  const isValidCombination = (container: ContainerType, material: Material): boolean => {
    // Add logic for valid combinations based on material type
    const validCombinations: Record<ContainerType, MaterialType[]> = {
      glass: ['liquid', 'marbles'], // glass can hold both liquid and marbles
      spoon: ['liquid'], // spoon can only hold liquids
    };

    return validCombinations[container]?.includes(material.type) ?? false;
  };

  // Render appropriate container-material combination
  const renderVisualization = () => {
    if (!isValidCombination(container.containerType, material)) {
      console.warn(`Invalid combination: ${container.containerType} with ${material}`);
      return null;
    }

    switch (container.containerType) {
      case 'glass':
        return (
          <Suspense fallback={<LoadingIndicator />}>
            <Glass 
              container={container}
              material={material}
              amount={amount}
            />
          </Suspense>
        );
      case 'spoon':
        // return <Spoon material={material} amount={amount} />;
        return null;
      default:
        console.warn(`Unknown container type: ${container.containerType}`);
        return null;
    }
  };

  return (
    <group>
      {renderVisualization()}
    </group>
  );
}

