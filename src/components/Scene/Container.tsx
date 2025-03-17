import type { Amount, Container, Material } from '@/types';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { LiquidMaterial } from './materials/LiquidMaterial';
import { MarblesMaterial } from './materials/MarblesMaterial';

interface GlassProps {
  material: Material;
  amount: Amount;
  container: Container;
}

export function Container({ material, amount, container }: GlassProps) {
  const { scene: glassModel } = useGLTF(container.modelPath);
  const glassMeshRef = useRef<THREE.Mesh | null>(null);

  // Create glass material once using useMemo
  const simpleMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      roughness: 0.4,
      metalness: 0.4,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      clearcoat: 0.2,
    });
  }, []);

  // Create mesh immediately when model is loaded
  const glassMesh = useMemo<THREE.Mesh | null>(() => {
    let mesh: THREE.Mesh | null = null;
    glassModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a new mesh with the same geometry but our material
        mesh = new THREE.Mesh(child.geometry, simpleMaterial);
        
        mesh.rotation.copy(child.rotation);
        mesh.scale.copy(child.scale);
        mesh.position.copy(child.position);
        
        // Disable shadows
        mesh.castShadow = false;
        mesh.receiveShadow = false;
        
        // Log glass bounds for debugging
        child.geometry.computeBoundingBox();
        const bounds = child.geometry.boundingBox;
        console.log('Glass model bounds:', {
          min: bounds.min,
          max: bounds.max
        });
      }
    });
    return mesh;
  }, [glassModel, simpleMaterial]);

  // Update ref when mesh is created
  useEffect(() => {
    if (glassMesh) {
      glassMeshRef.current = glassMesh;
    }
  }, [glassMesh]);

  // Render appropriate material visualization
  const renderMaterial = () => {
    if (!glassMesh?.geometry) return null;

    switch (material.type) {
      case 'liquid':
      case 'granular':
        return (
          <LiquidMaterial
            material={material}
            amount={amount}
            container={container}
          />
        );
      case 'marbles':
        return (
          <MarblesMaterial
            material={material}
            amount={amount}
            containerGeometry={glassMesh.geometry}
          />
        );
      default:
        console.warn(`Unsupported material for glass: ${material}`);
        return null;
    }
  };

  if (!glassMesh) {
    return null;
  }

  return (
    <group>
      <primitive object={glassMesh} />
      {renderMaterial()}
    </group>
  );
} 