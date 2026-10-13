import PokemonGrid from "@/components/pokemon/PokemonGrid";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/ui/SearchInput";
import { getPokemonByQuery, getPokemonCount, getPokemonList } from "@/services/pokeapi";

type SearchParams = Promise<{ page?: string; q?: string }>;

export default async function Home({ searchParams }: { searchParams: SearchParams }): Promise<React.ReactElement> {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const parsedPage = Number(params.page ?? "1");
  const page = Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const catalog = query ? null : await getPokemonList(page);
  const searchResult = query ? await getPokemonByQuery(query) : null;
  const items = catalog?.items ?? (searchResult ? [searchResult] : []);
  const totalCount = items.length === 0 && query ? await getPokemonCount() : null;

  return (
    <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:py-12">
      <header className="mb-10 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.25em] text-red-500">PokéAPI · Fase 1</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-slate-950 sm:text-6xl">Pokédex</h1>
          <p className="mt-3 max-w-xl text-base text-slate-500 sm:text-lg">
            Explora el mundo Pokémon, una criatura a la vez.
          </p>
        </div>
        <SearchInput initialQuery={query} />
      </header>

      {query && (
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Resultados para <strong className="text-slate-900">“{query}”</strong>
          </p>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-500">
            Búsqueda exacta
          </span>
        </div>
      )}

      {items.length > 0 ? (
        <PokemonGrid items={items} />
      ) : (
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <p className="text-4xl">🔎</p>
          <h2 className="mt-4 text-2xl font-black text-slate-900">No encontramos ese Pokémon</h2>
          <p className="mt-2 text-slate-500">
            {totalCount
              ? `Prueba con otro nombre o un ID entre 1 y ${totalCount}.`
              : "Prueba con otro nombre o ID."}
          </p>
        </div>
      )}

      {catalog && <Pagination page={catalog.page} totalPages={catalog.totalPages} query={query} />}
    </main>
  );
}
