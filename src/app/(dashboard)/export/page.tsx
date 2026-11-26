"use client";
import { jsPDF } from "jspdf";

export default function ExportPage() {
  const gen = () => {
    const doc = new jsPDF();
    doc.text("Note de calcul CVC", 10, 10);
    doc.text("Rapport projet - synthèse", 10, 20);
    doc.save("rapport-cvc.pdf");
  };
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Export</h1>
      <button onClick={gen} className="bg-blue-600 text-white rounded px-4 py-2">Générer rapport PDF</button>
    </main>
  );
}