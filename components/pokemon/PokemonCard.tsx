import Image from "next/image";
import Link from "next/link";
import { capitalize, formatPokemonId } from "@/lib/utils";
import type { PokemonCardData } from "@/types/pokemon";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }: { pokemon: PokemonCardData }): React.ReactElement {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group overflow-hidden rounded-3xl border-2 border-white/80 bg-white p-4 shadow-lg shadow-[#1e1b4b]/25 transition hover:-translate-y-1 hover:border-[#ffde00] hover:shadow-xl hover:shadow-[#1e1b4b]/40"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-white">
        <Image
          src={pokemon.image}
          alt={`Ilustración oficial de ${capitalize(pokemon.name)}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
          className="object-contain p-5 brightness-0 transition-all duration-300 group-hover:scale-110 group-hover:brightness-100"
        />
        <span
          aria-hidden="true"
          className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#ffde00] text-lg font-black text-[#1e1b4b] shadow-md transition duration-300 group-hover:scale-0 group-hover:opacity-0"
        >
          ?
        </span>
      </div>
      <div className="px-1 pt-4">
        <p className="text-sm font-bold text-slate-500">{formatPokemonId(pokemon.id)}</p>
        <h2 className="mt-1 text-xl font-extrabold capitalize text-slate-900">{pokemon.name}</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  );
}