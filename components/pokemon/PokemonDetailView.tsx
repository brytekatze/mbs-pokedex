import Image from "next/image";
import Link from "next/link";
import { capitalize, cleanFlavorText, formatPokemonId } from "@/lib/utils";
import type { PokemonDetail, PokemonSpeciesDetail } from "@/types/pokemon";
import StatBar from "./StatBar";
import TypeBadge from "./TypeBadge";

type PokemonDetailViewProps = {
  pokemon: PokemonDetail;
  species: PokemonSpeciesDetail;
};

export default function PokemonDetailView({ pokemon, species }: PokemonDetailViewProps): React.ReactElement {
  const description =
    species.flavor_text_entries.find((entry) => entry.language.name === "es")?.flavor_text ??
    species.flavor_text_entries.find((entry) => entry.language.name === "en")?.flavor_text ??
    "Sin descripción disponible.";

  const artwork = pokemon.sprites.other?.["official-artwork"]?.front_default ?? pokemon.sprites.front_default ?? "";

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-red-50 px-5 py-8 sm:px-8 lg:py-12">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-[#e3350d] transition hover:text-[#7f1d1d]"
      >
        ← Volver al catálogo
      </Link>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <section className="rounded-[2rem] bg-gradient-to-br from-red-600 via-rose-600 to-orange-500 p-6 text-white shadow-xl sm:p-10">
          <p className="text-lg font-bold text-red-100">{formatPokemonId(pokemon.id)}</p>
          <h1 className="mt-2 text-4xl font-black capitalize sm:text-6xl">{pokemon.name}</h1>
          <div className="mt-5 flex flex-wrap gap-2">
            {pokemon.types.map(({ type }) => (
              <TypeBadge key={type.name} type={type.name} />
            ))}
          </div>
          <div className="relative mx-auto mt-6 aspect-square max-w-md">
            <Image
              src={artwork}
              alt={`Ilustración oficial de ${capitalize(pokemon.name)}`}
              fill
              sizes="(max-width: 1024px) 90vw, 500px"
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <p className="text-lg leading-8 text-slate-600">{cleanFlavorText(description)}</p>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Altura</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {((pokemon.height ?? 0) / 10).toFixed(1)} m
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Peso</p>
                <p className="mt-1 text-xl font-extrabold text-slate-900">
                  {((pokemon.weight ?? 0) / 10).toFixed(1)} kg
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Habilidades</p>
                <p className="mt-1 text-base font-bold capitalize text-slate-900">
                  {pokemon.abilities.map(({ ability }) => ability.name.replace("-", " ")).join(", ")}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-black text-[#172554]">Estadísticas base</h2>
            <div className="mt-6 space-y-4">
              {pokemon.stats.map(({ stat, base_stat }) => (
                <StatBar key={stat.name} name={stat.name} value={base_stat} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}