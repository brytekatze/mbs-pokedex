const typeColors: Record<string, string> = {
  normal: 'bg-stone-500',
  fire: 'bg-orange-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400 text-slate-900',
  grass: 'bg-emerald-500',
  ice: 'bg-cyan-400 text-slate-900',
  fighting: 'bg-red-700',
  poison: 'bg-purple-600',
  ground: 'bg-amber-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-lime-600',
  rock: 'bg-yellow-700',
  ghost: 'bg-violet-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-slate-800',
  steel: 'bg-slate-500',
  fairy: 'bg-pink-300 text-slate-900',
};

export function getTypeColor(type: string): string {
  return typeColors[type.toLowerCase()] ?? 'bg-slate-500';
}
