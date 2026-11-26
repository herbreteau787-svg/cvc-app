import { DEBITS_VENTILATION } from "@/lib/cvc";
export default function SelectLocalType({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <select value={value} onChange={e => onChange(e.target.value)} className="border rounded p-1">
      {Object.keys(DEBITS_VENTILATION).map(k => <option key={k}>{k}</option>)}
    </select>
  );
}