import { useProgress } from '@react-three/drei';

/**
 * Loading component that matches the scene background and shows progress
 */
export function LoadingFallback() {
  const { progress } = useProgress();
  return (
    <group>
      <mesh>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#e8e8e8" />
      </mesh>
      {/* Only show loading indicator if taking more than a moment */}
      {progress < 100 && progress > 0 && (
        <mesh position={[0, 0, 0.1]}>
          <ringGeometry args={[0.5, 0.6, 32]} />
          <meshBasicMaterial color="#666666" />
        </mesh>
      )}
    </group>
  );
} 