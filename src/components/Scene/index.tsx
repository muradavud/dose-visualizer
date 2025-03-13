'use client';

import type { Amount, Container, Material } from '@/types';
import { OrbitControls, useProgress } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { Visualizer } from './Visualizer';

interface SceneProps {
  container: Container;
  material: Material;
  amount: Amount;
}

// Loading component that matches the scene background and shows progress
function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <group>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#e8e8e8" />
      </mesh>
      {/* Only show loading indicator if taking more than a moment */}
      {progress < 100 && progress > 0 && (
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color="#666666" />
        </mesh>
      )}
    </group>
  );
}

export function Scene({ container, material, amount }: SceneProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{
          position: [0.4, 0.3, 0],
          fov: 50,
        }}
        shadows="basic"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#e8e8e8']} />
        <ambientLight intensity={1} />
        <directionalLight intensity={5} position={[10, 10, 30]} />

        {/* <Environment preset="lobby" /> */}

        <Suspense fallback={<LoadingFallback />}>
          <Visualizer
            key={`${container.id}-${material.id}`} // Force remount on container/material change
            container={container}
            material={material}
            amount={amount}
          />
        </Suspense>

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
} 