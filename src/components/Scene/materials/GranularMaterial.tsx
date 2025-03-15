import { UNITS } from '@/constants/units';
import { granularFragmentShader, granularVertexShader } from '@/shaders/granular';
import type { Amount, Container, Material } from '@/types';
import { getHeightForVolume } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

interface GranularMaterialProps {
  material: Material;
  amount: Amount;
  container: Container;
  containerGeometry: THREE.BufferGeometry;
}

export function GranularMaterial({ material, amount, container, containerGeometry }: GranularMaterialProps) {
    const meshRef = useRef<THREE.Mesh>(null);
  
    // Create shader material
    const shaderMaterial = useMemo(() => {
      return new THREE.ShaderMaterial({
        vertexShader: granularVertexShader,
        fragmentShader: granularFragmentShader,
        uniforms: {
          color: { value: new THREE.Color(material.color) },
          fillLevel: { value: 0 },
          opacity: { value: 1 },
          modelMinY: { value: 0 },
          modelMaxY: { value: 1 }
        },
        side: THREE.DoubleSide,
      });
    }, [material.color]);
  
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
        rotation={[Math.PI / 2, 0, 0]}
      />
    );
  } 