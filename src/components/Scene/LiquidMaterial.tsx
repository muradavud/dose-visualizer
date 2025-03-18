import { UNITS } from '@/constants/units';
import { liquidFragmentShader, liquidVertexShader } from '@/shaders/liquid';
import type { Amount, Container, Material } from '@/types';
import { getHeightForVolume } from '@/utils/calculations';
import { convertUnits } from '@/utils/conversions';
import { useGLTF } from '@react-three/drei';
import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

interface LiquidMaterialProps {
  material: Material;
  amount: Amount;
  container: Container;
}

export function LiquidMaterial({ material, amount, container }: LiquidMaterialProps) {
  const { scene: insideModel } = useGLTF(container.insideModelPath);
  const [liquidObject, setLiquidObject] = useState<THREE.Object3D | null>(null);
  
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
    });
  }, [material.color, material.fresnelIntensity]);

  // Update fill level based on amount
  useEffect(() => {
    if (liquidObject) {
      const maxVolume = container.maxVolume;
      const currentVolume = convertUnits(amount.value, amount.unit, UNITS.MILLILITER, material);
      const volumeRatio = Math.min(currentVolume / maxVolume, 1);
      
      const heightRatio = getHeightForVolume(volumeRatio, container);
      shaderMaterial.uniforms.fillLevel.value = heightRatio;
    }
  }, [amount, container, material, shaderMaterial.uniforms, liquidObject]);

  // Handle model loading and setup
  useEffect(() => {
    insideModel.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Create a new object with the same geometry but our shader material
        const liquidMesh = new THREE.Mesh(child.geometry, shaderMaterial);
        
        // Copy the rotation and scale from the original mesh
        liquidMesh.rotation.copy(child.rotation);
        liquidMesh.scale.copy(child.scale);
        
        // Set position
        liquidMesh.position.copy(child.position);
        liquidMesh.position.y += 0.00005; // Small offset to prevent z-fighting
        
        // Compute bounds for the shader
        child.geometry.computeBoundingBox();
        const bounds = child.geometry.boundingBox;
        shaderMaterial.uniforms.modelMinY.value = bounds.min.y;
        shaderMaterial.uniforms.modelMaxY.value = bounds.max.y;
        
        setLiquidObject(liquidMesh);
      }
    });
  }, [insideModel, shaderMaterial]);

  if (!liquidObject) {
    return null;
  }

  return (
    <primitive object={liquidObject} />
  );
} 