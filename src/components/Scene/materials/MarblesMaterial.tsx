import { CONTAINERS } from '@/constants/containers';
import { MATERIALS } from '@/constants/materials';
import type { Amount, Container as ContainerType, Material } from '@/types';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

interface MarblesMaterialProps {
  material: Material;
  amount: Amount;
  containerType: ContainerType;
  containerGeometry: THREE.BufferGeometry;
}

export function MarblesMaterial({ material: type, amount, containerType, containerGeometry }: MarblesMaterialProps) {
  const groupRef = useRef<THREE.Group>(null);
  const material = MATERIALS[type];
  const container = CONTAINERS[containerType];

  // Create marble instances
  const marbles = useMemo(() => {
    const count = amount.unit === 'count' ? amount.value : Math.floor(amount.value);
    const marbleGeometry = new THREE.SphereGeometry(material.particleSize ?? 10, 32, 32);
    const marbleMaterial = new THREE.MeshPhysicalMaterial({
      color: material.color,
      roughness: 0.1,
      metalness: 0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    return Array.from({ length: count }, (_, i) => {
      // Calculate position within container bounds
      const radius = container.dimensions.diameter / 2;
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * (radius * 0.7); // 0.7 to keep away from edges
      const z = Math.sin(angle) * (radius * 0.7);
      const y = -container.dimensions.height / 2 + material.particleSize! + (i % 3) * material.particleSize!;

      return (
        <mesh
          key={i}
          geometry={marbleGeometry}
          material={marbleMaterial}
          position={[x, y, z]}
        />
      );
    });
  }, [amount, material, container]);

  // Gentle group rotation for visual interest
  useFrame(({ clock }) => {
    if (groupRef.current) {
      const time = clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
    }
  });

  return (
    <group ref={groupRef}>
      {marbles}
    </group>
  );
} 