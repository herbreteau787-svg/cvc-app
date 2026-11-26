"use client";
import { useState } from "react";
import ResultatCard from "@/components/ResultatCard";
import { PAROIS } from "@/lib/cvc";

const ORIENT = ["N","S","E","O","NE","NW","SE","SW"];
const SOLAIRE: Record<string,{hiver:number;ete:number}> = { N:{hiver:50,ete:80}, S:{hiver:200,ete:120}, E:{hiver:120,ete:250}, O:{hiver:120,ete:250}, NE:{hiver:80,ete:180}, NW:{hiver:80,ete:180}, SE:{hiver:160,ete:200}, SW:{hiver:160,ete:200} };
const VITRAGES = [{ type:"Double",u:1.3 },{ type:"Triple",u:0.8 },{ type:"Simple",u:5.0 }];

type Local = { id:number; nom:string; surface:number; hauteur:number; deltaT:number; paroi:string; orient:string; vitree:number; vitrage:string };

export default function CalculPage() {
  const [locaux, setLocaux] = useState<Local[]>([{ id:1, nom:"Local 1", surface:100, hauteur:2.5, deltaT:20, paroi:"Mur extérieur", orient:"S", vitree:10, vitrage:"Double" }]);
  const uOf = (p:string) => PAROIS.find(x=>x.type===p)?.u ?? 0.4;
  const uVit = (v:string) => VITRAGES.find(x=>x.type===v)?.u ?? 1.3;
  const upd = (id:number,k:keyof Local,v:string|number) => setLocaux(ls=>ls.map(l=>l.id===id?{...l,[k]:v}:l));
  const add = () => setLocaux(ls=>[...ls,{id:Date.now(),nom:`Local ${ls.length+1}`,surface:50,hauteur:2.5,deltaT:20,paroi:"Mur extérieur",orient:"S",vitree:5,vitrage:"Double"}]);
  const del = (id:number) => setLocaux(ls=>ls.filter(l=>l.id!==id));
  const depLocal = (l:Local) => l.surface*uOf(l.paroi)*l.deltaT + l.vitree*uVit(l.vitrage)*l.deltaT - SOLAIRE[l.orient].hiver*l.vitree;
  const totalVol = locaux.reduce((s,l)=>s+l.surface*l.hauteur,0);
  if (typeof window !== "undefined") localStorage.setItem("cvc_locaux", JSON.stringify(locaux));
  const totalDep = locaux.reduce((s,l)=>s+depLocal(l),0);
  const totalSol = locaux.reduce((s,l)=>s+SOLAIRE[l.orient].hiver*l.vitree,0);
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Calcul thermique multi-locaux</h1>
      <div className="space-y-3">
        {locaux.map(l=>(
          <div key={l.id} className="grid grid-cols-8 gap-2 items-end border p-3 rounded">
            <label className="flex flex-col text-sm">Nom<input value={l.nom} onChange={e=>upd(l.id,"nom",e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Surface<input type="number" value={l.surface} onChange={e=>upd(l.id,"surface",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Hauteur<input type="number" value={l.hauteur} onChange={e=>upd(l.id,"hauteur",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">ΔT<input type="number" value={l.deltaT} onChange={e=>upd(l.id,"deltaT",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Paroi<select value={l.paroi} onChange={e=>upd(l.id,"paroi",e.target.value)} className="border rounded p-1">{PAROIS.map(p=><option key={p.type}>{p.type}</option>)}</select></label>
            <label className="flex flex-col text-sm">Orientation<select value={l.orient} onChange={e=>upd(l.id,"orient",e.target.value)} className="border rounded p-1">{ORIENT.map(o=><option key={o}>{o}</option>)}</select></label>
            <label className="flex flex-col text-sm">Vitré (m²)<input type="number" value={l.vitree} onChange={e=>upd(l.id,"vitree",+e.target.value)} className="border rounded p-1"/></label>
            <label className="flex flex-col text-sm">Vitrage<select value={l.vitrage} onChange={e=>upd(l.id,"vitrage",e.target.value)} className="border rounded p-1">{VITRAGES.map(v=><option key={v.type}>{v.type}</option>)}</select></label>
            <button onClick={()=>del(l.id)} className="bg-red-500 text-white rounded p-1 col-span-8">Suppr</button>
          </div>
        ))}
      </div>
      <button onClick={add} className="bg-blue-600 text-white rounded px-4 py-2">Ajouter local</button>
      <div className="grid grid-cols-3 gap-4">
        <ResultatCard label="Volume total" value={totalVol.toFixed(1)} unit="m³" />
        <ResultatCard label="Apports solaires" value={totalSol.toFixed(0)} unit="W" />
        <ResultatCard label="Déperdition nette" value={totalDep.toFixed(0)} unit="W" />
      </div>
    </main>
  );
}