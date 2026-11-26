"use client";
import { jsPDF } from "jspdf";

export default function ExportPage() {
  const gen = () => {
    const doc = new jsPDF();
    let y = 10;
    doc.text("Note de calcul CVC", 10, y); y += 10;
    const locaux = JSON.parse(localStorage.getItem("cvc_locaux") || "[]");
    doc.text("Locaux", 10, y); y += 6;
    locaux.forEach((l: any) => { doc.text(`${l.nom}: S=${l.surface}m2, h=${l.hauteur}, orient=${l.orient}`, 10, y); y += 5; });
    y += 4;
    const troncons = JSON.parse(localStorage.getItem("cvc_troncons") || "[]");
    doc.text("Troncons plomberie", 10, y); y += 6;
    troncons.forEach((t: any) => { const s = Math.PI*(t.d/1000)**2/4; doc.text(`${t.nom}: Q=${t.q}m3/s, DN=${t.d}, V=${(t.q/s).toFixed(2)}m/s`, 10, y); y += 5; });
    doc.save("rapport-cvc.pdf");
  };
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export</h1>
      <button onClick={gen} className="bg-blue-600 text-white rounded px-4 py-2">Générer rapport PDF</button>
    </main>
  );
}