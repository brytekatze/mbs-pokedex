import Image from "next/image";
import PokemonExplorer from "@/components/pokemon/PokemonExplorer";
import { getPokemonList } from "@/services/pokeapi";
import pokemonLogo from "@/pokemon-logo.png";

export default async function Home(): Promise<React.ReactElement> {
  const catalog = await getPokemonList(1);

  return (
    <main className="relative isolate min-h-screen overflow-hidden bg-gradient-to-br from-[#1e1b4b] via-[#312e81] to-[#5b21b6] px-5 py-8 sm:px-8 lg:py-12">
      <div className="pointer-events-none absolute -left-32 -top-32 -z-10 h-96 w-96 rounded-full bg-[#ffde00]/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 top-24 -z-10 h-[28rem] w-[28rem] rounded-full bg-[#3b4cca]/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#c084fc]/25 blur-3xl" />
      <div className="mx-auto w-full max-w-7xl">
        <header className="mb-10 flex w-full flex-col items-center text-center">
          <Image src={pokemonLogo} alt="Pokémon" priority className="h-auto w-full max-w-md drop-shadow-2xl" />
          <p className="mt-6 text-2xl font-black uppercase tracking-[0.18em] text-[#ffde00] [text-shadow:2px_2px_0_#1e1b4b,4px_4px_0_rgba(59,76,202,0.85)] sm:text-4xl">
            ¿Quién es ese Pokémon?
          </p>
          <p className="mt-4 w-full text-base font-semibold text-indigo-100 sm:text-lg">
            Descubre nuevos Pokémon y sigue explorando sin límites.
          </p>
        </header>

        <PokemonExplorer initialCatalog={catalog} />
      </div>
    </main>
  );
}