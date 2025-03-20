import { Container as ContainerComponent } from '@/components/Visualizer/Container';
import { OverflowIndicator } from '@/components/ui/OverflowIndicator';
import { UNITS } from '@/constants/units';
import { isDiscreteMaterial, type Amount, type Container, type Material } from '@/types';
import { convertUnits } from '@/utils/conversions';
import { useGLTF } from '@react-three/drei';
import { Suspense, useMemo } from 'react';
import { LoadingIndicator } from '../ui/LoadingIndicator';

interface VisualizerProps {
  container: Container;
  material: Material;
  amount: Amount;
  showBanana?: boolean;
}

function CuttingBoard() {
  const { scene } = useGLTF('/assets/models/cuttingboard.glb');
  return (
    <primitive 
      object={scene} 
      position={[0, 0, 0]} 
      scale={[0.01, 0.01, 0.01]}
    />
  );
}

function Banana() {
  const { scene } = useGLTF('/assets/models/banana.glb');
  return (
    <primitive 
      object={scene} 
      position={[0.1, 0, -0.05]}
      rotation={[0, 90, 0]}
    />
  );
}

export function Visualizer({ container, material, amount, showBanana = false }: VisualizerProps) {
  // Calculate the amount to display in the container (capped at max capacity)
  const displayAmount = useMemo(() => {
    // For non-discrete materials, cap the display amount at container max
    if (material.type !== 'marbles') {
      const amountInMl = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
      const maxValue = container.maxVolume;
      
      if (amountInMl > maxValue) {
        const displayValue = amountInMl % maxValue || maxValue; // Show full container if exactly divisible
        return {
          value: convertUnits(displayValue, UNITS.MILLILITER, amount.unit, material),
          unit: amount.unit
        };
      }
      return amount;
    }
    
    return amount;
  }, [amount, container.maxVolume, material]);

  const renderVisualization = () => {
    switch (container.containerType) {
      case 'glass':
        return (
          <Suspense fallback={<LoadingIndicator />}>
            <ContainerComponent 
              container={container}
              material={material}
              amount={displayAmount}
            />
            {/* Only show overflow indicator for non-discrete materials */}
            {!isDiscreteMaterial(material) && (
              <OverflowIndicator
                amount={amount}
                container={container}
                material={material}
              />
            )}
          </Suspense>
        );
      default:
        console.warn(`Unknown container type: ${container.containerType}`);
        return null;
    }
  };

  return (
    <group>
      {renderVisualization()}
      <Suspense fallback={null}>
        <CuttingBoard />
      </Suspense>
      {showBanana && (
        <Suspense fallback={null}>
          <Banana />
        </Suspense>
      )}
    </group>
  );
}

