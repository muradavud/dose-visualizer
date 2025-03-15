'use client';

import { ControlPanel } from '@/components/Layout/ControlPanel';
import { Scene } from '@/components/Scene';
import { DEFAULT_MATERIAL, MATERIALS } from '@/constants';
import { CONTAINERS, DEFAULT_CONTAINER } from '@/constants/containers';
import { UNITS } from '@/constants/units';
import { Amount, Container, Material } from '@/types';
import { useState } from 'react';

export default function Home() {
  const [selectedContainer, setSelectedContainer] = useState<Container>(CONTAINERS[DEFAULT_CONTAINER]);
  const [selectedMaterial, setSelectedMaterial] = useState<Material>(MATERIALS[DEFAULT_MATERIAL]);
  const [amount, setAmount] = useState<Amount>({
    value: 0,
    unit: UNITS.MILLILITER
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
