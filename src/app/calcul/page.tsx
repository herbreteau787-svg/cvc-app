"use client";
import { useState } from "react";
import ResultatCard from "@/components/ResultatCard";

const PAROIS = [
  { type: "Mur extérieur", u: 0.25 },
  { type: "Toiture", u: 0.18 },
  { type: "Plancher bas", u: 0.25 },
  { type: "Vitrage", u: 1.3 },
  { type: "Pont thermique", u: 0.5 },
];

type Local = { id: number; nom: string; surface: number; hauteur: number; deltaT: number; paroi: string };

export default function CalculPage() {
  const [locaux, setLocaux] = useState<Local[]>([{ id: 1, nom: "Local 1", surface: 100, hauteur: 2.5, deltaT: 20, paroi: "Mur extérieur" }]);
  const uOf = (p: string) => PAROIS.find(x => x.type === p)?.u ?? 0.4;
  const upd = (id: number, k: keyof Local, v: string | number) => setLocaux(ls => ls.map(l => l.id === id ? { ...l, [k]: v } : l));
  const add = () => setLocaux(ls => [...ls, { id: Date.now(), nom: `Local ${ls.length + 1}`, surface: 50, hauteur: 2.5, deltaT: 20, paroi: "Mur extérieur" }]);
  const del = (id: number) => setLocaux(ls => ls.filter(l => l.id !== id));
  const totalVol = locaux.reduce((s, l) => s + l.surface * l.hauteur, 0);
  const totalDep = locaux.reduce((s, l) => s + l.surface * uOf(l.paroi) * l.deltaT, 0);
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Calcul thermique multi-locaux</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border">
          <thead><tr className="bg-gray-100"><th className="p-2">Paroi</th><th className="p-2">U (W/m²K)</th></tr></thead>
          <tbody>{PAROIS.map(p => <tr key={p.type} className="border-t"><td className="p-2">{p.type}</td><td className="p-2">{p.u}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="space-y-3">
        {locaux.map(l => (
          <div key={l.id} className="grid grid-cols-6 gap-2 items-end border p-3 rounded">
            <label className="flex flex-col text-sm">Nom<input value={l.nom} onChange={e=>upd(l.id,"nom",e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Surface<input type="number" value={l.surface} onChange={e=>upd(l.id,"surface",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Hauteur<input type="number" value={l.hauteur} onChange={e=>upd(l.id,"hauteur",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">ΔT<input type="number" value={l.deltaT} onChange={e=>upd(l.id,"deltaT",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Paroi<select value={l.paroi} onChange={e=>upd(l.id,"paroi",e.target.value)} className="border rounded p-1">{PAROIS.map(p=><option key={p.type}>{p.type}</option>)}</select></label>
            <button onClick={()=>del(l.id)} className="bg-red-500 text-white rounded p-1">Suppr</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="bg-blue-600 text-white rounded px-4 py-2">Ajouter local</button>
      <div className="grid grid-cols-2 gap-4">
        <ResultatCard label="Volume total" value={totalVol.toFixed(1)} unit="m³" />
        <ResultatCard label="Déperdition totale" value={totalDep.toFixed(0)} unit="W" />
      </div>
    </main>
  );
}