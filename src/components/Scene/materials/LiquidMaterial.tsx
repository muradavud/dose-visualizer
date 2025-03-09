import { CONTAINERS } from '@/constants/containers';
import { MATERIALS } from '@/constants/materials';
import { liquidFragmentShader, liquidVertexShader } from '@/shaders/liquid';
import type { Amount, Container as ContainerType, Material } from '@/types';
import { useFrame } from '@react-three/fiber';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface LiquidMaterialProps {
  material: Material;
  amount: Amount;
  containerType: ContainerType;
  containerGeometry: THREE.BufferGeometry;
}

export function LiquidMaterial({ material: type, amount, containerType, containerGeometry }: LiquidMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = MATERIALS[type];
  const container = CONTAINERS[containerType];
  
  const getHeightForVolume = useCallback((volumeRatio: number) => {
    const { volumeMap } = container;
    
    // Find the two mapping points we're between
    for (let i = 0; i < volumeMap.length - 1; i++) {
      if (volumeRatio <= volumeMap[i + 1].volume) {
        const lower = volumeMap[i];
        const upper = volumeMap[i + 1];
        
        // Interpolate between the two points
        const ratio = (volumeRatio - lower.volume) / (upper.volume - lower.volume);
        return lower.height + (upper.height - lower.height) * ratio;
      }
    }
    return 1.0;
  }, [container]);
  
  // Create shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        color: { value: new THREE.Color(material.color) },
        fillLevel: { value: 0 },
        opacity: { value: 0.3 },
        modelMinY: { value: 0 },
        modelMaxY: { value: 1 }
      },
      transparent: true,
      side: THREE.DoubleSide,
      depthWrite: false,
      depthTest: true
    });
  }, [material.color]);

  // Update fill level based on amount
  useEffect(() => {
    if (meshRef.current) {
      const maxVolume = container.maxVolume;
      const currentVolume = amount.unit === 'ml' ? amount.value : amount.value / material.density;
      const volumeRatio = Math.min(currentVolume / maxVolume, 1);
      
      // Convert volume ratio to height ratio using our mapping
      const heightRatio = getHeightForVolume(volumeRatio);
      
      shaderMaterial.uniforms.fillLevel.value = heightRatio;
    }
  }, [amount, container.maxVolume, getHeightForVolume, material.density, shaderMaterial.uniforms]);

  // Animate waves
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
    }
  });

  useEffect(() => {
    if (!containerGeometry.boundingBox) {
      containerGeometry.computeBoundingBox();
    }
    
    shaderMaterial.uniforms.modelMinY.value = containerGeometry.boundingBox?.min.y ?? 0;
    shaderMaterial.uniforms.modelMaxY.value = containerGeometry.boundingBox?.max.y ?? 1;
  }, [containerGeometry, shaderMaterial]);

  return (
    <mesh 
      ref={meshRef}
      geometry={containerGeometry}
      material={shaderMaterial}
      scale={0.995} // Slightly smaller than container to avoid z-fighting
    />
  );
} 