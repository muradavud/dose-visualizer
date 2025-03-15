import type { Amount, Container, Material } from '@/types';
import { useLoader } from '@react-three/fiber';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GranularMaterial } from '../materials/GranularMaterial';
import { LiquidMaterial } from '../materials/LiquidMaterial';
import { MarblesMaterial } from '../materials/MarblesMaterial';

interface GlassProps {
  material: Material;
  amount: Amount;
  container: Container;
}

export function Glass({ material, amount, container }: GlassProps) {
  const glassModel = useLoader(GLTFLoader, container.modelPath);
  const insideModel = useLoader(GLTFLoader, container.insideModelPath);
  const insideGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const glassGeometryRef = useRef<THREE.BufferGeometry | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Create glass material once using useRef
  const simpleMaterial = useRef(new THREE.MeshPhysicalMaterial({
    roughness: 0.05,
    metalness: 0.1,
    transmission: 0.8,
    thickness: 0.5,
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    side: THREE.DoubleSide,
    clearcoat: 0.1,
  })).current;

  // Apply materials and store geometries for both models
  useEffect(() => {
    if (glassModel.scene && insideModel.scene) {
      // Handle glass model
      glassModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = simpleMaterial;
          child.castShadow = false;
          child.receiveShadow = false;

          // Store the glass geometry directly without transformation
          if (!glassGeometryRef.current) {
            glassGeometryRef.current = child.geometry;
            
            // Log glass bounds for debugging
            child.geometry.computeBoundingBox();
            const bounds = child.geometry.boundingBox;
            console.log('Glass model bounds:', {
              min: bounds.min,
              max: bounds.max
            });
          }
        }
      });

      // Handle inside model
      insideModel.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          // Store the inside geometry directly without transformation
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

      setIsReady(true);
    }
  }, [glassModel, insideModel, simpleMaterial]);

  // Render appropriate material visualization
  const renderMaterial = () => {
    if (!insideGeometryRef.current || !glassGeometryRef.current) return null;

    switch (material.type) {
      case 'liquid':
        return (
          <LiquidMaterial
            material={material}
            amount={amount}
            container={container}
            containerGeometry={insideGeometryRef.current}
          />
        );
      case 'marbles':
        return (
          <MarblesMaterial
            material={material}
            amount={amount}
            containerGeometry={glassGeometryRef.current}
          />
        );
      case 'granular':
        return (
          <GranularMaterial
            material={material}
            amount={amount}
            container={container}
            containerGeometry={insideGeometryRef.current}
          />
        );
      default:
        console.warn(`Unsupported material for glass: ${material}`);
        return null;
    }
  };

  if (!isReady) {
    return null;
  }

  return (
    <group>
      <primitive object={glassModel.scene} />
      {renderMaterial()}
    </group>
  );
} 