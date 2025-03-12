'use client';

import type { Amount, Container, Material } from '@/types';
import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Visualizer } from './Visualizer';

interface SceneProps {
  container: Container;
  material: Material;
  amount: Amount;
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

        <Visualizer
          container={container}
          material={material}
          amount={amount}
        />

        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[1, 1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        <OrbitControls />
      </Canvas>
    </div>
  );
} 