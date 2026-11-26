type Props = { label: string; value: string; unit?: string };
export default function ResultatCard({ label, value, unit }: Props) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="text-2xl font-bold">{value}{unit && <span className="text-base ml-1">{unit}</span>}</div>
    </div>
  );
}