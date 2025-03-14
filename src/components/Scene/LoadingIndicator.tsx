import { Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Group } from 'three';

/**
 * A 3D loading indicator that appears as a spinning segmented circle
 * - Always faces the camera
 * - Positioned 10cm above the surface
 * - 2cm in diameter
 * - Rotates continuously
 */
export function LoadingIndicator() {
  const spinnerRef = useRef<Group>(null);
  
  // Animate the spinner rotation
  useFrame((_, delta) => {
    if (spinnerRef.current) {
      spinnerRef.current.rotation.z -= delta * 2; // Rotate counter-clockwise
    }
  });

  // Create segments for the loading spinner
  const segments = 12; // Number of segments
  const segmentAngle = (Math.PI * 2) / segments;
  
  return (
    <Billboard position={[0, 0.1, 0]}>
      <group ref={spinnerRef} scale={[0.02, 0.02, 0.02]}>
        {/* Create multiple arc segments with varying opacity */}
        {[...Array(segments)].map((_, i) => {
          // Calculate opacity based on position (creates fading effect)
          const opacity = 0.2 + (0.8 * (i / segments));
          
          return (
            <mesh key={i} rotation={[0, 0, i * segmentAngle]}>
              <torusGeometry args={[0.8, 0.1, 8, 1, segmentAngle * 0.8]} />
              <meshBasicMaterial color="#666666" transparent opacity={opacity} />
            </mesh>
          );
        })}
      </group>
    </Billboard>
  );
} 