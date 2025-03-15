import type { Amount, Container, Material } from '@/types';
import { Suspense } from 'react';
import { Glass } from './containers/Glass';
import { LoadingIndicator } from './LoadingIndicator';

interface VisualizerProps {
  container: Container;
  material: Material;
  amount: Amount;
}

export function Visualizer({ container, material, amount }: VisualizerProps) {
  const renderVisualization = () => {
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

