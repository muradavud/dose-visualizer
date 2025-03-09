import type { Amount, Material as MaterialType } from '@/types';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LiquidMaterial } from '../materials/LiquidMaterial';
import { MarblesMaterial } from '../materials/MarblesMaterial';

interface GlassProps {
  material: MaterialType;
  amount: Amount;
}

export function Glass({ material, amount }: GlassProps) {
  const gltf = useLoader(GLTFLoader, '/assets/models/glass_pokal_12oz_inside.glb');
  const glassGeometryRef = useRef<THREE.BufferGeometry | null>(null);

  // Apply glass material to the model
  useEffect(() => {
    if (gltf.scene) {
      const simpleMaterial = new THREE.MeshStandardMaterial({
        roughness: 0.5,
        metalness: 0.5,
        color: '#ffffff',
        opacity: 0.5,
        transparent: true,
      });

      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          glassGeometryRef.current = child.geometry;
          child.material = simpleMaterial;
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
  }, [gltf]);

  // Render appropriate material visualization
  const renderMaterial = () => {
    if (!glassGeometryRef.current) return null;

    switch (material) {
      case 'water':
        return (
          <LiquidMaterial
            type={material}
            amount={amount}
            containerType="glass"
            containerGeometry={glassGeometryRef.current}
          />
        );
      case 'marbles':
        return (
          <MarblesMaterial
            type={material}
            amount={amount}
            containerType="glass"
            containerGeometry={glassGeometryRef.current}
          />
        );
      default:
        console.warn(`Unsupported material for glass: ${material}`);
        return null;
    }
  };

  return (
    <group>
      <primitive object={gltf.scene} scale={100} />
      {renderMaterial()}
    </group>
  );
} 