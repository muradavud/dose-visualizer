import { Amount, Material } from '@/types';
import { Physics, RigidBody } from '@react-three/rapier';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface MarblesMaterialProps {
  material: Material;
  amount: Amount;
  containerGeometry: THREE.BufferGeometry;
}

export function MarblesMaterial({ material, amount, containerGeometry }: MarblesMaterialProps) {
  const marbleRadius = 0.016 / 2; // 16mm diameter = 0.016m
  const [isTabVisible, setIsTabVisible] = useState(true);
  const physicsKey = useRef(0);

  const marbleMaterial = useRef(new THREE.MeshPhysicalMaterial({
    color: material.color,
    roughness: 0.1,
    metalness: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  })).current;

  const marbleGeometry = useRef(new THREE.SphereGeometry(marbleRadius, 32, 32)).current;
  const gridConfig = useMemo(() => ({ rows: 3, columns: 3 }), []);
  const marbleSpacing = useMemo(() => marbleRadius * 2.2, [marbleRadius]);

  const getMarbleId = useCallback((index: number) => `marble-${material.id}-${index}`, [material.id]);


  const handleVisibilityChange = useCallback(() => {
    const newVisibility = !document.hidden;
    if (newVisibility && !isTabVisible) {
      physicsKey.current += 1;
    }
    setIsTabVisible(newVisibility);
  }, [isTabVisible]);

  useEffect(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [handleVisibilityChange]);

  useEffect(() => {
    if (containerGeometry && !containerGeometry.boundingBox) {
      containerGeometry.computeBoundingBox();
    }
  }, [containerGeometry]);

  const newMarbles = useMemo(() => {
    if (!containerGeometry.boundingBox) return [];

    const bounds = containerGeometry.boundingBox;
    const count = amount.unit.type === 'count' ? amount.value : Math.floor(amount.value);
    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerZ = (bounds.min.z + bounds.max.z) / 2;
    const gridWidthHalf = ((gridConfig.columns - 1) * marbleSpacing) / 2;
    const gridDepthHalf = ((gridConfig.rows - 1) * marbleSpacing) / 2;
    const marblesPerLayer = gridConfig.rows * gridConfig.columns;

    return Array.from({ length: count }, (_, i) => {
      const layer = Math.floor(i / marblesPerLayer);
      const gridIndex = i % marblesPerLayer;
      const row = Math.floor(gridIndex / gridConfig.columns);
      const col = gridIndex % gridConfig.columns;
      const jitter = marbleRadius * 0.1;

      const position = new THREE.Vector3(
        centerX - gridWidthHalf + (col * marbleSpacing) + (Math.random() - 0.5) * jitter,
        bounds.max.y + marbleRadius + (layer * marbleSpacing),
        centerZ - gridDepthHalf + (row * marbleSpacing) + (Math.random() - 0.5) * jitter
      );

      return (
        <RigidBody key={getMarbleId(i)} colliders="ball" position={position.toArray()} restitution={0.3} friction={0.8} mass={0.01}>
          <mesh geometry={marbleGeometry} material={marbleMaterial} />
        </RigidBody>
      );
    });
  }, [containerGeometry, amount, gridConfig, marbleSpacing, marbleRadius, getMarbleId, marbleGeometry, marbleMaterial]);

  return (
    <>
      <Physics key={`physics-${physicsKey.current}`}
        updatePriority={0}
        gravity={[0, -0.5, 0]}
        timeStep={1 / 30}
        paused={!isTabVisible}>
        <RigidBody type="fixed" friction={0.2} colliders="trimesh">
          <mesh geometry={containerGeometry}>
            <meshBasicMaterial wireframe opacity={0} transparent />
          </mesh>
        </RigidBody>

        {newMarbles}
      </Physics>
    </>
  );
}
