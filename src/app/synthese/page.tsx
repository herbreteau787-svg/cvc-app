import { calcPrix } from "@/lib/cvc";
export default function SynthesePage() {
  const surface = 1000; const puissance = 50000;
  const chauf = calcPrix(surface, puissance, "chauffage");
  const froid = calcPrix(surface, puissance, "eau_glacee");
  const vent = calcPrix(surface, puissance, "ventilation");
  const total = chauf + froid + vent;
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Synthèse projet</h1>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-100"><th className="p-2">Système</th><th className="p-2">Coût estimé (€)</th></tr></thead>
        <tbody>
          <tr className="border-t"><td className="p-2">Chauffage</td><td className="p-2">{chauf.toFixed(0)}</td></tr>
          <tr className="border-t"><td className="p-2">Eau glacée</td><td className="p-2">{froid.toFixed(0)}</td></tr>
          <tr className="border-t"><td className="p-2">Ventilation</td><td className="p-2">{vent.toFixed(0)}</td></tr>
          <tr className="border-t font-bold"><td className="p-2">Total</td><td className="p-2">{total.toFixed(0)}</td></tr>
        </tbody>
      </table>
    </main>
  );
}