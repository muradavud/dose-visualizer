import type { Amount, Container, ContainerType, Material, MaterialType } from '@/types';
import { useLoader } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Glass } from './containers/Glass';

interface VisualizerProps {
  container: Container;
  material: Material;
  amount: Amount;
}

// Preload component that ensures both container and material are ready
function PreloadedContainer({ container, material, amount }: VisualizerProps) {
  const [isReady, setIsReady] = useState(false);
  
  // Preload the container model
  const glassModel = useLoader(GLTFLoader, container.modelPath);
  const insideModel = useLoader(GLTFLoader, container.insideModelPath);

  useEffect(() => {
    // Ensure models are loaded before showing
    if (glassModel && insideModel) {
      setIsReady(true);
    }
  }, [glassModel, insideModel]);

  if (!isReady) return null;

  return <Glass material={material} amount={amount} container={container} />;
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
          <Suspense fallback={null}>
            <PreloadedContainer 
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