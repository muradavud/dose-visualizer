export type ContainerType = 'glass';

export interface Container {
  id: string;
  containerType: ContainerType;
  name: string;
  maxVolume: number;
  maxMarbles?: number;
  dimensions: {
    height: number; 
    diameter: number; 
  } | null;
  modelPath: string;
  insideModelPath: string;
  fullAt: number; // Percentage at which container is considered full (e.g., 0.95 for 95%)
  volumeMap: Array<{
    volume: number;  
    height: number;  
  }>;
}
