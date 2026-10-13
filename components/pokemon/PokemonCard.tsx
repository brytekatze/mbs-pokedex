import Image from "next/image";
import Link from "next/link";
import { capitalize, formatPokemonId } from "@/lib/utils";
import type { PokemonCardData } from "@/types/pokemon";
import TypeBadge from "./TypeBadge";

export default function PokemonCard({ pokemon }: { pokemon: PokemonCardData }): React.ReactElement {
  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-200 hover:shadow-xl"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-red-50">
        <Image
          src={pokemon.image}
          alt={`Ilustración oficial de ${capitalize(pokemon.name)}`}
          fill
          sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 220px"
          className="object-contain p-5 transition duration-300 group-hover:scale-110"
        />
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