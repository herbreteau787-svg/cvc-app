"use client";
import { useState } from "react";
import ResultatCard from "@/components/ResultatCard";

export default function CalculPage() {
  const [surface, setSurface] = useState(100);
  const [hauteur, setHauteur] = useState(2.5);
  const [deltaT, setDeltaT] = useState(20);
  const [u, setU] = useState(0.4);
  const volume = surface * hauteur;
  const deperdition = surface * u * deltaT;
  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Calcul thermique</h1>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex flex-col">Surface (m²)<input type="number" value={surface} onChange={e=>setSurface(+e.target.value)} className="border rounded p-2"/></label>
        <label className="flex flex-col">Hauteur (m)<input type="number" value={hauteur} onChange={e=>setHauteur(+e.target.value)} className="border rounded p-2"/></label>
        <label className="flex flex-col">ΔT (K)<input type="number" value={deltaT} onChange={e=>setDeltaT(+e.target.value)} className="border rounded p-2"/></label>
        <label className="flex flex-col">U (W/m²K)<input type="number" value={u} onChange={e=>setU(+e.target.value)} className="border rounded p-2"/></label>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ResultatCard label="Volume" value={volume.toFixed(1)} unit="m³" />
        <ResultatCard label="Déperdition" value={deperdition.toFixed(0)} unit="W" />
      </div>
    </main>
  );
}