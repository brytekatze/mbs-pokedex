import { capitalize } from "@/lib/utils";

const labels: Record<string, string> = {
  hp: "HP",
  attack: "Attack",
  defense: "Defense",
  "special-attack": "Sp. Atk",
  "special-defense": "Sp. Def",
  speed: "Speed",
};

export default function StatBar({ name, value }: { name: string; value: number }): React.ReactElement {
  const label = labels[name] ?? capitalize(name);
  const percentage = Math.min(100, (value / 150) * 100);

  return (
    <div className="grid grid-cols-[5.5rem_2.5rem_1fr] items-center gap-3 text-sm">
      <span className="font-semibold text-slate-500">{label}</span>
      <span className="font-bold text-slate-900">{value}</span>
      <div className="h-2.5 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}