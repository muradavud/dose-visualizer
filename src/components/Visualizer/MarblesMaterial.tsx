import type { Amount, Material } from '@/types';
import { Html } from '@react-three/drei';
import { Physics, RigidBody } from '@react-three/rapier';
import { JSX, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface MarblesMaterialProps {
  material: Material;
  amount: Amount;
  containerGeometry: THREE.BufferGeometry;
}

export function MarblesMaterial({ material, amount, containerGeometry }: MarblesMaterialProps) {
  const marbleRadius = 0.016 / 2; // 16mm diameter = 0.016m
  const [marbles, setMarbles] = useState<JSX.Element[]>([]);
  const [isPhysicsPaused, setIsPhysicsPaused] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const physicsKey = useRef(0);

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
  const marbleGeometry = useRef(new THREE.SphereGeometry(marbleRadius, 8, 8)).current;

  // Fixed grid layout configuration - 3x3 grid
  const gridConfig = {
    rows: 3,
    columns: 3,
  };

  // Fixed spacing between marbles - just enough to prevent collision
  const marbleSpacing = marbleRadius * 2.2; // 10% more than diameter

  // Handle keyboard events for pausing physics
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'p' || event.key === 'P') {
        setIsPhysicsPaused(prevState => !prevState);
      }
    };
    
    // Add event listener for key press
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Handle tab visibility changes to reset physics when tab becomes visible again
  useEffect(() => {
    const handleVisibilityChange = (): void => {
      const newVisibility = !document.hidden;
      
      // If tab becomes visible again, reset the physics world to prevent jumps
      if (newVisibility && !isTabVisible) {
        physicsKey.current += 1;
      }
      
      setIsTabVisible(newVisibility);
    };
    
    // Add event listener for visibility change
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Clean up event listener
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isTabVisible]);

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
    const count = amount.unit.type === 'count' ? amount.value : Math.floor(amount.value);
    
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
  }, [amount]);
  
  return (
    <>
      {/* Pause indicator */}
      {isPhysicsPaused && (
        <Html position={[0, 0.2, 0]} center>
          <div style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '4px',
            fontWeight: 'bold',
            pointerEvents: 'none',
          }}>
            PAUSED (Press P to resume)
          </div>
        </Html>
      )}
      
      <Physics 
        key={`physics-${physicsKey.current}`}
        updatePriority={0} 
        gravity={[0, -1, 0]} 
        timeStep="vary"
        paused={isPhysicsPaused || !isTabVisible}
      >
        <RigidBody type="fixed" friction={0.2} colliders="trimesh">
          <mesh geometry={containerGeometry}>
            <meshBasicMaterial wireframe opacity={0} transparent />
          </mesh>
        </RigidBody>
        
        {/* Marbles */}
        {marbles}
      </Physics>
    </>
  );
}