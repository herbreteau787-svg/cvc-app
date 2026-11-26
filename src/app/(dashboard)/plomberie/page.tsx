"use client";
import { useState } from "react";
import { chezy, sectionCirc } from "@/lib/cvc";

type Troncon = { id:number; nom:string; q:number; d:number; pente:number };

export default function PlomberiePage() {
  const [troncons, setTroncons] = useState<Troncon[]>([{ id:1, nom:"Tronçon 1", q:0.5, d:32, pente:1 }]);
  const upd = (id:number,k:keyof Troncon,v:string|number) => setTroncons(ts=>ts.map(t=>t.id===id?{...t,[k]:v}:t));
  const add = () => setTroncons(ts=>[...ts,{id:Date.now(),nom:`Tronçon ${ts.length+1}`,q:0.5,d:32,pente:1}]);
  const del = (id:number) => setTroncons(ts=>ts.filter(t=>t.id!==id));
  if (typeof window !== "undefined") localStorage.setItem("cvc_troncons", JSON.stringify(troncons));
  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Plomberie / Hydraulique</h1>
      <div className="space-y-2">
        {troncons.map(t=>(
          <div key={t.id} className="grid grid-cols-5 gap-2 items-end border p-3 rounded">
            <label className="flex flex-col text-sm">Nom<input value={t.nom} onChange={e=>upd(t.id,"nom",e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Q (m³/s)<input type="number" step="0.01" value={t.q} onChange={e=>upd(t.id,"q",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">DN (mm)<input type="number" value={t.d} onChange={e=>upd(t.id,"d",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Pente (%)<input type="number" step="0.1" value={t.pente} onChange={e=>upd(t.id,"pente",+e.target.value)} className="border rounded p-1"/></label>
            <button onClick={()=>del(t.id)} className="bg-red-500 text-white rounded p-1">Suppr</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="bg-blue-600 text-white rounded px-4 py-2">Ajouter tronçon</button>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-100"><th className="p-2">Tronçon</th><th className="p-2">Q (m³/s)</th><th className="p-2">DN</th><th className="p-2">Section (m²)</th><th className="p-2">V (m/s)</th><th className="p-2">Qcap (m³/s)</th></tr></thead>
        <tbody>{troncons.map(t=>{const s=sectionCirc(t.d);const v=t.q/s;const qcap=chezy(t.d,t.pente);return <tr key={t.id} className="border-t"><td className="p-2">{t.nom}</td><td className="p-2">{t.q.toFixed(3)}</td><td className="p-2">{t.d}</td><td className="p-2">{s.toFixed(4)}</td><td className="p-2">{v.toFixed(2)}</td><td className="p-2">{qcap.toFixed(3)}</td></tr>;})}</tbody>
      </table>
    </main>
  );
}