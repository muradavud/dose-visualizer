import * as THREE from 'three';

export const CONTAINER_MATERIALS: Record<string, THREE.MeshPhysicalMaterialParameters> = {
    pokal_12oz: {
      roughness: 0.4,
      metalness: 0.2,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      clearcoat: 0.2,
    },
    vardagen_15oz: {
      roughness: 0.4,
      metalness: 0.2,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.3,
      side: THREE.DoubleSide,
      clearcoat: 0.2,
    },
    mopsig_tablespoon: {
      roughness: 0.2,
      metalness: 0.7,
      transmission: 0.0,
      thickness: 0.3,
      transparent: false,
      opacity: 1.0,
      side: THREE.DoubleSide,
      clearcoat: 0.4,
    },
    mopsig_teaspoon: {
      roughness: 0.2,
      metalness: 0.7,
      transmission: 0.0,
      thickness: 0.3,
      transparent: false,
      opacity: 1.0,
      side: THREE.DoubleSide,
      clearcoat: 0.4,
    }
  }; 