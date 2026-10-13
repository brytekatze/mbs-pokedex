"use client";

export default function SearchInput({ value, onChange }: { value: string; onChange: (value: string) => void }): React.ReactElement {
  return (
    <label className="relative block w-full max-w-xl">
      <span className="sr-only">Buscar Pokémon por nombre o ID</span>
      <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">⌕</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Busca por nombre o ID..."
        className="h-14 w-full rounded-2xl border border-[#3b4cca]/30 bg-white pl-11 pr-5 text-base text-[#172554] shadow-sm outline-none transition placeholder:text-slate-500 focus:border-[#3b4cca] focus:ring-4 focus:ring-[#3b4cca]/20"
      />
    </label>
  );
}
