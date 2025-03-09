import { CONTAINERS } from '@/constants/containers';
import { MATERIALS } from '@/constants/materials';
import { liquidFragmentShader, liquidVertexShader } from '@/shaders/liquid';
import type { Amount, Container as ContainerType, Material as MaterialType } from '@/types';
import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface LiquidMaterialProps {
  type: MaterialType;
  amount: Amount;
  containerType: ContainerType;
  containerGeometry: THREE.BufferGeometry;
}

export function LiquidMaterial({ type, amount, containerType, containerGeometry }: LiquidMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const material = MATERIALS[type];
  const container = CONTAINERS[containerType];
  
  // Create shader material
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader: liquidVertexShader,
      fragmentShader: liquidFragmentShader,
      uniforms: {
        color: { value: new THREE.Color(material.color) },
        fillLevel: { value: 0 },
        opacity: { value: 0.9 }
      },
      transparent: true,
      side: THREE.DoubleSide
    });
  }, [material.color]);

  // Update fill level based on amount
  useEffect(() => {
    if (meshRef.current) {
      const maxVolume = container.maxVolume;
      const currentVolume = amount.unit === 'ml' ? amount.value : amount.value / material.density;
      const fillLevel = Math.min(currentVolume / maxVolume, 1);
      shaderMaterial.uniforms.fillLevel.value = fillLevel;
    }
  }, [amount, container.maxVolume, material.density, shaderMaterial.uniforms]);

  // Animate waves
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime();
      meshRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
    }
  });

  return (
    <mesh 
      ref={meshRef}
      geometry={containerGeometry}
      material={shaderMaterial}
      scale={0.995} // Slightly smaller than container to avoid z-fighting
    />
  );
} 