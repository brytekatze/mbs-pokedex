"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import SearchInput from "@/components/ui/SearchInput";
import { getPokemonList } from "@/services/pokeapi";
import type { PokemonCatalog, PokemonCardData } from "@/types/pokemon";

const pokemonTypes = ["all", "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison", "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"];
const generations = [
  { label: "Todas las generaciones", value: "all", min: 1, max: 1025 },
  { label: "Generación I", value: "1", min: 1, max: 151 },
  { label: "Generación II", value: "2", min: 152, max: 251 },
  { label: "Generación III", value: "3", min: 252, max: 386 },
  { label: "Generación IV", value: "4", min: 387, max: 493 },
  { label: "Generación V", value: "5", min: 494, max: 649 },
  { label: "Generación VI", value: "6", min: 650, max: 721 },
  { label: "Generación VII", value: "7", min: 722, max: 809 },
  { label: "Generación VIII", value: "8", min: 810, max: 905 },
  { label: "Generación IX", value: "9", min: 906, max: 1025 },
];

function sortItems(items: PokemonCardData[], sort: string): PokemonCardData[] {
  return [...items].sort((a, b) => sort === "name" ? a.name.localeCompare(b.name) : a.id - b.id);
}

export default function PokemonExplorer({ initialCatalog }: { initialCatalog: PokemonCatalog }): React.ReactElement {
  const [items, setItems] = useState(initialCatalog.items);
  const [page, setPage] = useState(initialCatalog.page);
  const [query, setQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [generation, setGeneration] = useState("all");
  const [sort, setSort] = useState("id");
  const [isTypeMenuOpen, setIsTypeMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const typeMenuRef = useRef<HTMLDivElement>(null);
  const hasMore = page < initialCatalog.totalPages;

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);
    try {
      const nextCatalog = await getPokemonList(page + 1);
      setItems((current) => [...current, ...nextCatalog.items]);
      setPage(nextCatalog.page);
    } catch {
      setError("No pudimos cargar más Pokémon. Intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [hasMore, isLoading, page]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) void loadMore();
    }, { rootMargin: "500px" });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  useEffect(() => {
    const closeMenu = (event: PointerEvent) => {
      if (typeMenuRef.current && !typeMenuRef.current.contains(event.target as Node)) {
        setIsTypeMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", closeMenu);
    return () => document.removeEventListener("pointerdown", closeMenu);
  }, []);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const selectedGeneration = generations.find((entry) => entry.value === generation) ?? generations[0];
    const filtered = items.filter((pokemon) => {
      const matchesQuery = !normalizedQuery || pokemon.name.includes(normalizedQuery) || String(pokemon.id).includes(normalizedQuery);
      const matchesType = selectedTypes.length === 0 || selectedTypes.some((selectedType) => pokemon.types.includes(selectedType));
      const matchesGeneration = pokemon.id >= selectedGeneration.min && pokemon.id <= selectedGeneration.max;
      return matchesQuery && matchesType && matchesGeneration;
    });
    return sortItems(filtered, sort);
  }, [generation, items, query, selectedTypes, sort]);

  const selectedGeneration = generations.find((entry) => entry.value === generation);
  const activeFilters = [
    ...selectedTypes.map((selectedType) => ({ label: `Tipo: ${selectedType}`, clear: () => setSelectedTypes((current) => current.filter((type) => type !== selectedType)) })),
    generation !== "all" && selectedGeneration ? { label: selectedGeneration.label, clear: () => setGeneration("all") } : null,
  ].filter((filter): filter is { label: string; clear: () => void } => filter !== null);

  const toggleType = (pokemonType: string) => {
    setSelectedTypes((current) => current.includes(pokemonType) ? current.filter((type) => type !== pokemonType) : [...current, pokemonType]);
  };

  return (
    <section aria-label="Catálogo de Pokémon">
      <div className="relative z-30 mb-6 rounded-3xl border-2 border-[#ffde00]/80 bg-white/95 p-4 shadow-xl shadow-[#172554]/15 backdrop-blur sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <SearchInput value={query} onChange={setQuery} />
          <div className="flex flex-wrap gap-3">
            <label className="flex min-w-40 flex-1 flex-col gap-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Ordenar
              <select value={sort} onChange={(event) => setSort(event.target.value)} className="h-11 rounded-xl border border-[#3b4cca]/30 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-[#172554] outline-none focus:border-[#3b4cca] focus:ring-4 focus:ring-[#3b4cca]/20">
                <option value="id">Número Pokédex</option>
                <option value="name">Nombre A-Z</option>
              </select>
            </label>
            <label className="flex min-w-48 flex-1 flex-col gap-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              Generación
              <select value={generation} onChange={(event) => setGeneration(event.target.value)} className="h-11 rounded-xl border border-[#3b4cca]/30 bg-white px-3 text-sm font-semibold normal-case tracking-normal text-[#172554] outline-none focus:border-[#3b4cca] focus:ring-4 focus:ring-[#3b4cca]/20">
                {generations.map((entry) => <option key={entry.value} value={entry.value}>{entry.label}</option>)}
              </select>
            </label>
            <div ref={typeMenuRef} className="relative flex min-w-48 flex-1 flex-col gap-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              <span>Tipo</span>
              <button type="button" role="combobox" aria-expanded={isTypeMenuOpen} aria-controls="pokemon-type-options" onClick={() => setIsTypeMenuOpen((open) => !open)} className="flex h-11 items-center justify-between rounded-xl border border-slate-300 bg-white px-3 text-left text-sm font-semibold normal-case tracking-normal text-[#172554] outline-none transition hover:border-[#3b4cca] focus:border-[#3b4cca] focus:ring-4 focus:ring-[#3b4cca]/20">
                <span>{selectedTypes.length === 0 ? "Todos los tipos" : `${selectedTypes.length} seleccionados`}</span>
                <span aria-hidden="true">⌄</span>
              </button>
              {isTypeMenuOpen && (
                <div id="pokemon-type-options" role="listbox" aria-label="Seleccionar tipos de Pokémon" aria-multiselectable="true" className="absolute left-0 top-full z-50 mt-2 grid max-h-72 w-full min-w-64 grid-cols-2 gap-1 overflow-y-auto rounded-2xl border-2 border-[#3b4cca] bg-white p-2 text-xs normal-case tracking-normal shadow-2xl sm:grid-cols-3">
                  {pokemonTypes.filter((pokemonType) => pokemonType !== "all").map((pokemonType) => {
                    const isSelected = selectedTypes.includes(pokemonType);
                    return <button key={pokemonType} type="button" role="option" aria-selected={isSelected} onClick={() => toggleType(pokemonType)} className={`flex items-center gap-2 rounded-lg px-2 py-2 text-left font-bold capitalize transition ${isSelected ? "bg-[#3b4cca] text-white" : "text-[#172554] hover:bg-[#ffde00]"}`}><span className={`flex h-4 w-4 items-center justify-center rounded border text-[10px] ${isSelected ? "border-white bg-white text-[#3b4cca]" : "border-[#172554]"}`}>{isSelected ? "✓" : ""}</span>{pokemonType}</button>;
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
        {activeFilters.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2" aria-label="Filtros seleccionados">
            <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Filtros:</span>
            {activeFilters.map((filter) => (
              <button key={filter.label} type="button" onClick={filter.clear} className="inline-flex items-center gap-2 rounded-full bg-[#3b4cca] px-3 py-2 text-xs font-bold text-white transition hover:bg-[#172554]">
                {filter.label}
                <span aria-hidden="true" className="text-sm leading-none">×</span>
                <span className="sr-only">Quitar {filter.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mb-5 flex items-center justify-between gap-4 text-sm text-slate-600">
        <p>{visibleItems.length === 0 ? "Sin resultados con estos filtros" : `${visibleItems.length} Pokémon visibles`}</p>
        <p className="hidden text-right sm:block">Cargados {items.length} de {initialCatalog.count}</p>
      </div>

      <div className="relative z-0">
        {visibleItems.length > 0 ? <PokemonGrid items={visibleItems} /> : <div className="rounded-3xl border-2 border-dashed border-[#3b4cca] bg-white px-6 py-16 text-center"><p className="text-4xl">🔎</p><h2 className="mt-4 text-2xl font-black text-[#172554]">No encontramos coincidencias</h2><p className="mt-2 text-[#334155]">Prueba con otro nombre, tipo o generación.</p></div>}
      </div>

      <div ref={sentinelRef} className="flex min-h-24 items-center justify-center py-8" aria-live="polite">
        {isLoading && <p className="font-semibold text-[#172554]">Cargando más Pokémon…</p>}
        {!isLoading && error && <button type="button" onClick={() => void loadMore()} className="rounded-xl bg-[#3b4cca] px-4 py-2 text-sm font-bold text-white hover:bg-[#172554]">Reintentar</button>}
        {!isLoading && !error && !hasMore && <p className="text-sm font-semibold text-[#172554]">Has llegado al final de la Pokédex.</p>}
      </div>
    </section>
  );
}
