import { UNITS } from '@/constants/units';
import { liquidFragmentShader, liquidVertexShader } from '@/shaders/liquid';
import type { Amount, Container, Material } from '@/types';
import { getHeightForVolume } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface LiquidMaterialProps {
  material: Material;
  amount: Amount;
  container: Container;
  containerGeometry: THREE.BufferGeometry;
}

export function LiquidMaterial({ material , amount, container, containerGeometry }: LiquidMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
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
        modelMaxY: { value: 1 },
        fresnelIntensity: { value: material.fresnelIntensity ?? 0.05 }
      },
      side: THREE.DoubleSide,
      // transparent: true,
      // depthWrite: false,
      // depthTest: true
    });
  }, [material.color, material.fresnelIntensity]);

  // Update fill level based on amount
  useEffect(() => {
    if (meshRef.current) {
      const maxVolume = container.maxVolume;
      const currentVolume = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
      const volumeRatio = Math.min(currentVolume / maxVolume, 1);
      
      // Use the imported function instead
      const heightRatio = getHeightForVolume(volumeRatio, container);
      
      shaderMaterial.uniforms.fillLevel.value = heightRatio;
    }
  }, [amount, container, material, shaderMaterial.uniforms]);


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
      position={[0, 0.00005, 0]}
      />
  );
} 