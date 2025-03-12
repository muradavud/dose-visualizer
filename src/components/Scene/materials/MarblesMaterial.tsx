import { MATERIALS } from '@/constants/materials';
import type { Amount, Material } from '@/types';
import { Physics, RigidBody } from '@react-three/rapier';
import { useMemo } from 'react';
import * as THREE from 'three';

interface MarblesMaterialProps {
  material: Material;
  amount: Amount;
  containerGeometry: THREE.BufferGeometry;
}

export function MarblesMaterial({ material: type, amount, containerGeometry }: MarblesMaterialProps) {
  const material = MATERIALS[type];

  // Convert particle size from mm to meters (16mm = 0.016m)
  const marbleRadius = 0.016 / 2; // 16mm diameter = 0.016m

  // Create marble instances
  const marbles = useMemo(() => {
    const count = amount.unit === 'count' ? amount.value : Math.floor(amount.value);
    const marbleGeometry = new THREE.SphereGeometry(marbleRadius, 32, 32);
    const marbleMaterial = new THREE.MeshPhysicalMaterial({
      color: material.color,
      roughness: 0.1,
      metalness: 0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const bounds = containerGeometry.boundingBox!;
    const spacing = marbleRadius * 2.05; // Slightly more than diameter for tiny gap

    return Array.from({ length: count }, (_, i) => {
      // Stack marbles vertically with a tiny random horizontal offset
      const offset = 0.0001; // Very small offset to prevent perfect stacking
      const position = new THREE.Vector3(
        (Math.random() - 0.5) * offset,
        bounds.max.y + (i * spacing), // Each marble higher than the last
        (Math.random() - 0.5) * offset
      );

      return (
        <RigidBody
          key={i}
          colliders="ball"
          position={position.toArray()}
          restitution={0.3}
          friction={0.8}
          mass={0.01} // 10 grams per marble
        >
          <mesh
            geometry={marbleGeometry}
            material={marbleMaterial}
          />
        </RigidBody>
      );
    });
  }, [amount, material, containerGeometry, marbleRadius]);

  return (
    <Physics updatePriority={0} gravity={[0, -0.5, 0]} timeStep="vary">
      {/* Container using trimesh collider */}
      <RigidBody type="fixed" friction={0.2} colliders="trimesh">
        <mesh geometry={containerGeometry}>
          <meshBasicMaterial wireframe opacity={0} transparent />
        </mesh>
      </RigidBody>
      
      {/* Marbles */}
      {marbles}
    </Physics>
  );
} 