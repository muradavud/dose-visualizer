import type { Amount, Material } from '@/types';
import { Physics, RigidBody } from '@react-three/rapier';
import { JSX, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MarblesMaterialProps {
  material: Material;
  amount: Amount;
  containerGeometry: THREE.BufferGeometry;
}

export function MarblesMaterial({ material, amount, containerGeometry }: MarblesMaterialProps) {
  // Convert particle size from mm to meters (16mm = 0.016m)
  const marbleRadius = 0.016 / 2; // 16mm diameter = 0.016m
  
  // Track marbles with state to manage additions/removals smoothly
  const [marbles, setMarbles] = useState<JSX.Element[]>([]);
  
  // Generate a stable unique ID for each marble
  const getMarbleId = (index: number) => `marble-${material.id}-${index}`;
  
  // Create marble material once
  const marbleMaterial = useRef(new THREE.MeshPhysicalMaterial({
    color: material.color,
    roughness: 0.1,
    metalness: 0,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  })).current;
  
  // Create marble geometry once
  const marbleGeometry = useRef(new THREE.SphereGeometry(marbleRadius, 32, 32)).current;

  // Fixed grid layout configuration - 3x3 grid
  const gridConfig = {
    rows: 3,
    columns: 3,
  };

  // Fixed spacing between marbles - just enough to prevent collision
  const marbleSpacing = marbleRadius * 2.2; // 10% more than diameter

  // Ensure we have a bounding box for the container
  useEffect(() => {
    if (containerGeometry && !containerGeometry.boundingBox) {
      containerGeometry.computeBoundingBox();
    }
  }, [containerGeometry]);

  // Calculate positions for marbles
  useEffect(() => {
    if (!containerGeometry.boundingBox) return;
    
    const bounds = containerGeometry.boundingBox;
    const count = amount.unit === 'count' ? amount.value : Math.floor(amount.value);
    
    // Find the center point of the container
    const centerX = (bounds.min.x + bounds.max.x) / 2;
    const centerZ = (bounds.min.z + bounds.max.z) / 2;
    
    // Calculate the offset to center the grid
    const gridWidthHalf = ((gridConfig.columns - 1) * marbleSpacing) / 2;
    const gridDepthHalf = ((gridConfig.rows - 1) * marbleSpacing) / 2;
    
    // Calculate marbles per layer from rows and columns
    const marblesPerLayer = gridConfig.rows * gridConfig.columns;
    
    // Create marbles
    const newMarbles = Array.from({ length: count }, (_, i) => {
      // Calculate layer
      const layer = Math.floor(i / marblesPerLayer);
      
      // Calculate position within the grid
      const gridIndex = i % marblesPerLayer;
      const row = Math.floor(gridIndex / gridConfig.columns);
      const col = gridIndex % gridConfig.columns;
      
      // Calculate position with small random jitter
      const jitter = marbleRadius * 0.1; // Small jitter
      
      const position = new THREE.Vector3(
        centerX - gridWidthHalf + (col * marbleSpacing) + (Math.random() - 0.5) * jitter,
        bounds.max.y + marbleRadius + (layer * marbleSpacing),
        centerZ - gridDepthHalf + (row * marbleSpacing) + (Math.random() - 0.5) * jitter
      );
      
      return (
        <RigidBody
          key={getMarbleId(i)}
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
    
    setMarbles(newMarbles);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, containerGeometry, marbleRadius, material.id]);
  
  // Reset physics world when amount changes to prevent collision issues
  const physicsKey = useRef(0);
  
  useEffect(() => {
    // Increment the key to force physics world recreation when amount changes
    physicsKey.current += 1;
  }, [amount]);
  
  return (
    <Physics 
      key={`physics-${physicsKey.current}`}
      updatePriority={0} 
      gravity={[0, -1, 0]} 
      timeStep="vary"
    >
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