export type ContainerType = 'glass' | 'spoon';

export interface Container {
  id: string;
  containerType: ContainerType;
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
