export type Container = 'glass' | 'spoon';

export interface ContainerSpecs {
  id: Container;
  name: string;
  maxVolume: number; // ml
  dimensions: {
    height: number; // cm
    diameter: number; // cm
  };
  modelPath: string;
  insideModelPath: string;
  volumeMap: Array<{
    volume: number;  // ratio 0-1
    height: number;  // ratio 0-1
  }>;
}
