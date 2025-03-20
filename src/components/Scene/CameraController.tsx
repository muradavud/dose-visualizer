import { Container } from '@/types';
import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useCallback, useEffect, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

interface CameraControllerProps {
  container: Container;
}

/**
 * Custom camera controller with reset functionality
 */
export function CameraController({ container }: CameraControllerProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, gl } = useThree();
  
  // Reset camera function that can be reused
  const resetCamera = useCallback(() => {
    if (controlsRef.current && container && container.dimensions) {
      const defaultCameraPosition: [number, number, number] = [-0.4, 0.3, 0.3];
      // Reset camera position
      camera.position.set(defaultCameraPosition[0], defaultCameraPosition[1], defaultCameraPosition[2]);
      
      // Set target to half the container height (convert from cm to scene units)
      const halfHeight = container.dimensions.height / 2 / 100;
      controlsRef.current.target.set(0, halfHeight, 0);
      controlsRef.current.update();
    }
  }, [camera, container, controlsRef]);
  
  // Reset camera when container changes
  useEffect(() => {
    resetCamera();
  }, [resetCamera]);
  
  // Set up event listener for manual resets
  useEffect(() => {
    const handleResetCamera = () => {
      resetCamera();
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('reset-camera', handleResetCamera);
    
    return () => {
      canvas.removeEventListener('reset-camera', handleResetCamera);
    };
  }, [gl, resetCamera]);
  
  return <OrbitControls ref={controlsRef} />;
} 