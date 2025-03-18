import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

/**
 * Custom camera controller with reset functionality
 */
export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { camera, gl } = useThree();
  
  useEffect(() => {
    const defaultCameraPosition: [number, number, number] = [-0.4, 0.3, 0.3];
    
    const handleResetCamera = () => {
      if (controlsRef.current) {
        // Reset camera position
        camera.position.set(defaultCameraPosition[0], defaultCameraPosition[1], defaultCameraPosition[2]);
        // Reset target to origin
        controlsRef.current.target.set(0, 0, 0);
        controlsRef.current.update();
      }
    };
    
    const canvas = gl.domElement;
    canvas.addEventListener('reset-camera', handleResetCamera);
    
    return () => {
      canvas.removeEventListener('reset-camera', handleResetCamera);
    };
  }, [camera, gl]);
  
  return <OrbitControls ref={controlsRef} />;
} 