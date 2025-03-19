'use client';

import { LoadingFallback } from '@/components/ui/LoadingFallback';
import { Visualizer } from '@/components/Visualizer';
import { DEFAULT_MATERIAL, MATERIALS } from '@/constants';
import { CONTAINERS, DEFAULT_CONTAINER } from '@/constants/containers';
import { UNITS } from '@/constants/units';
import type { Amount, Container, Material } from '@/types';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { CameraController } from './CameraController';
import { SceneControls } from './SceneControls';

export function Scene() {
  const [container, setContainer] = useState<Container>(CONTAINERS[DEFAULT_CONTAINER]);
  const [material, setMaterial] = useState<Material>(MATERIALS[DEFAULT_MATERIAL]);
  const [amount, setAmount] = useState<Amount>({
    value: 0,
    unit: UNITS.MILLILITER
  });
  const [showBanana, setShowBanana] = useState(false);

  // Handle scene-specific view controls
  const handleResetView = () => {
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const event = new CustomEvent('reset-camera');
      canvas.dispatchEvent(event);
    }
  };

  // Toggle banana visibility
  const handleToggleBanana = () => {
    setShowBanana(!showBanana);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Scene Controls UI */}
      <SceneControls
        onResetView={handleResetView}
        container={container}
        material={material}
        amount={amount}
        showBanana={showBanana}
        onContainerChange={setContainer}
        onMaterialChange={setMaterial}
        onAmountChange={setAmount}
        onToggleBanana={handleToggleBanana}
      />

      <Canvas
        camera={{
          position: [-0.4, 0.3, 0.3],
          fov: 50,
        }}
        performance={{ min: 0.5 }}
      >
        <color attach="background" args={['#f0f4f8']} />
        <fog attach="fog" args={['#f0f4f8', 5, 20]} />

        <ambientLight intensity={1} />
        <directionalLight
          intensity={4}
          position={[10, 10, 30]}
        />

        <Suspense fallback={<LoadingFallback />}>
          <Visualizer
            key={`${container.id}-${material.id}`}
            container={container}
            material={material}
            amount={amount}
            showBanana={showBanana}
          />
        </Suspense>

        <CameraController />
      </Canvas>
    </div>
  );
} 