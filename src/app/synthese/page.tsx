export default function SynthesePage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Synthèse projet</h1>
      <table className="w-full text-sm border">
        <thead><tr className="bg-gray-100"><th className="p-2">Local</th><th className="p-2">Surface</th><th className="p-2">Puissance</th><th className="p-2">Débit</th><th className="p-2">DN</th></tr></thead>
        <tbody><tr><td className="p-2" colSpan={5}>Données à connecter</td></tr></tbody>
      </table>
    </main>
  );
}