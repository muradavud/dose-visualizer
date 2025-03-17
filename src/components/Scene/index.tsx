'use client';

import type { Amount, Container, Material } from '@/types';
import { OrbitControls, useGLTF, useProgress } from '@react-three/drei';
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

export function Scene({ container, material, amount }: SceneProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Canvas
        camera={{
          position: [-0.4, 0.3, 0.3],
          fov: 50,
        }}
        shadows="basic"
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        {/* Gradient background */}
        <color attach="background" args={['#f0f4f8']} />
        <fog attach="fog" args={['#f0f4f8', 5, 20]} />
        
        {/* Improved lighting setup */}
        <ambientLight intensity={1} />
        <directionalLight 
          intensity={4} 
          position={[10, 10, 30]} 
          castShadow
        />
        
        {/* Environment lighting */}
        {/* <Environment preset="lobby" background={false} /> */}

        <Suspense fallback={<LoadingFallback />}>
          <Visualizer
            key={`${container.id}-${material.id}`}
            container={container}
            material={material}
            amount={amount}
          />
        </Suspense>

        <Suspense fallback={null}>
          <CuttingBoard />
        </Suspense>

        <OrbitControls />
      </Canvas>
    </div>
  );
} 