export type ContainerType = 'glass' | 'spoon';

export interface ContainerSpecs {
  id: ContainerType;
  name: string;
  maxVolume: number; // ml
  dimensions: {
    height: number; // cm
    diameter: number; // cm
  };
}

export type Container = ContainerType; 