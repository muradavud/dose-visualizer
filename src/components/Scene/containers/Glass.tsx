import { CONTAINERS } from '@/constants/containers';
import type { Amount, Material } from '@/types';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { LiquidMaterial } from '../materials/LiquidMaterial';
import { MarblesMaterial } from '../materials/MarblesMaterial';

interface GlassProps {
  material: Material;
  amount: Amount;
}

export function Glass({ material, amount }: GlassProps) {
  const container = CONTAINERS.glass;
  const glassModel = useLoader(GLTFLoader, container.modelPath);
  const insideModel = useLoader(GLTFLoader, container.insideModelPath);
  const insideGeometryRef = useRef<THREE.BufferGeometry | null>(null);

  // Apply glass material to the outer model
  useEffect(() => {
    if (glassModel.scene) {
      const simpleMaterial = new THREE.MeshPhysicalMaterial({
        roughness: 0.05,         // Slightly smoother
        metalness: 0.1,          // Tiny bit of metallic for shine
        transmission: 0.8,       // Slightly less transparent
        thickness: 0.5,          // More thickness for better edges
        transparent: true,
        opacity: 0.5,            // More visible
        depthWrite: false,
        side: THREE.DoubleSide,
        clearcoat: 0.1           // Add subtle shine
      });

      glassModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = simpleMaterial;
          child.castShadow = false;
          child.receiveShadow = false;
        }
      });
    }
  }, [glassModel]);

  // Get the geometry from the inside model
  useEffect(() => {
    if (insideModel.scene) {
      insideModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          insideGeometryRef.current = child.geometry;
          
          // Get the actual bounds of the geometry
          child.geometry.computeBoundingBox();
          const bounds = child.geometry.boundingBox;
          console.log('Inside glass model bounds:', {
            min: bounds.min,
            max: bounds.max
          });
        }
      });
    }
  }, [insideModel]);

  // Render appropriate material visualization
  const renderMaterial = () => {
    if (!insideGeometryRef.current) return null;

    switch (material) {
      case 'water':
        return (
          <LiquidMaterial
            material={material}
            amount={amount}
            containerType="glass"
            containerGeometry={insideGeometryRef.current}
          />
        );
      case 'marbles':
        return (
          <MarblesMaterial
            material={material}
            amount={amount}
            containerType="glass"
            containerGeometry={insideGeometryRef.current}
          />
        );
      default:
        console.warn(`Unsupported material for glass: ${material}`);
        return null;
    }
  };

  return (
    <group>
      <primitive object={glassModel.scene}  />
      {renderMaterial()}
    </group>
  );
} 