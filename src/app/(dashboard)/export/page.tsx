"use client";
import { jsPDF } from "jspdf";
import * as XLSX from "xlsx";

export default function ExportPage() {
  const locaux = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("cvc_locaux") || "[]" : "[]");
  const troncons = JSON.parse(typeof window !== "undefined" ? localStorage.getItem("cvc_troncons") || "[]" : "[]");

  const genPDF = () => {
    const doc = new jsPDF(); let y = 10;
    doc.text("Note de calcul CVC", 10, y); y += 8;
    doc.text("Locaux", 10, y); y += 5;
    locaux.forEach((l: any) => { doc.text(`${l.nom}: S=${l.surface}m2, h=${l.hauteur}, orient=${l.orient}`, 10, y); y += 4; });
    y += 4; doc.text("Troncons", 10, y); y += 5;
    troncons.forEach((t: any) => { const s = Math.PI*(t.d/1000)**2/4; doc.text(`${t.nom}: Q=${t.q}m3/s, DN=${t.d}, V=${(t.q/s).toFixed(2)}m/s`, 10, y); y += 4; });
    doc.save("rapport-cvc.pdf");
  };

  const genXlsx = () => {
    const wb = XLSX.utils.book_new();
    const ws1 = XLSX.utils.json_to_sheet(locaux);
    const ws2 = XLSX.utils.json_to_sheet(troncons);
    XLSX.utils.book_append_sheet(wb, ws1, "Locaux");
    XLSX.utils.book_append_sheet(wb, ws2, "Troncons");
    XLSX.writeFile(wb, "rapport-cvc.xlsx");
  };

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Export</h1>
      <div className="flex gap-2">
        <button onClick={genPDF} className="bg-blue-600 text-white rounded px-4 py-2">Export PDF</button>
        <button onClick={genXlsx} className="bg-green-600 text-white rounded px-4 py-2">Export Excel</button>
      </div>
    </main>
  );
}