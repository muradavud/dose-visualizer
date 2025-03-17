import type { Amount, Container, Material } from '@/types';
import { useGLTF } from '@react-three/drei';
import { Suspense } from 'react';
import { LoadingIndicator } from '../ui/LoadingIndicator';
import { Container as ContainerComponent } from './Container';

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
  const renderVisualization = () => {
    switch (container.containerType) {
      case 'glass':
        return (
          <Suspense fallback={<LoadingIndicator />}>
            <ContainerComponent 
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

