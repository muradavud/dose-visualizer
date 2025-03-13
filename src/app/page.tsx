'use client';

import { ControlPanel } from '@/components/Layout/ControlPanel';
import { Scene } from '@/components/Scene';
import { MATERIALS } from '@/constants';
import { CONTAINERS, DEFAULT_CONTAINER } from '@/constants/containers';
import { Amount, Container, Material } from '@/types';
import { useState } from 'react';

export default function Home() {
  const [selectedContainer, setSelectedContainer] = useState<Container>(CONTAINERS[DEFAULT_CONTAINER]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS['water']);
  const [amount, setAmount] = useState<Amount>({
    value: 0,
    unit: 'ml'
  });

  // Handle container changes and reset material and amount
  const handleContainerChange = (newContainer: Container) => {
    setSelectedContainer(newContainer);

    // Adjust amount based on new container's maximum
    if (selectedMaterial.type === 'marbles') {
      setAmount({
        value: Math.min(amount.value, newContainer.maxMarbles || 0),
        unit: 'count'
      });
    } else {
      setAmount({
        value: Math.min(amount.value, newContainer.maxVolume),
        unit: amount.unit
      });
    }
  };

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
        onContainerChange={handleContainerChange}
        onMaterialChange={setSelectedMaterial}
        onAmountChange={setAmount}
      />
    </main>
  );
}
