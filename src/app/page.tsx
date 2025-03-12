'use client';

import { ControlPanel } from '@/components/Layout/ControlPanel';
import { Scene } from '@/components/Scene';
import { CONTAINERS } from '@/constants/containers';
import { Amount, Container, Material } from '@/types';
import { useState } from 'react';

export default function Home() {
  const [selectedContainer, setSelectedContainer] = useState<Container>(CONTAINERS['glass']);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>('water');
  const [amount, setAmount] = useState<Amount>({
    value: 0,
    unit: 'ml'
  });

  return (
    <main className="flex min-h-screen flex-col">
      <div className="flex-1 relative">
        <Scene 
          container={selectedContainer}
          material={selectedMaterial}
          amount={amount}
        />
      </div>
      <ControlPanel
        container={selectedContainer}
        material={selectedMaterial}
        amount={amount}
        onContainerChange={setSelectedContainer}
        onMaterialChange={setSelectedMaterial}
        onAmountChange={setAmount}
      />
    </main>
  );
}
