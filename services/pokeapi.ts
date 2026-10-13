import { getPokemonIdFromUrl } from "@/lib/utils";
import type {
  NamedApiResource,
  PokemonCardData,
  PokemonCatalog,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpeciesDetail,
} from "@/types/pokemon";

const API_URL = "https://pokeapi.co/api/v2";
export const PAGE_SIZE = 24;

async function fetchPokeApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`PokéAPI respondió con ${response.status} para ${path}`);
  }
  return response.json() as Promise<T>;
}

function fetchListing(page: number): Promise<PokemonListResponse> {
  const offset = (page - 1) * PAGE_SIZE;
  return fetchPokeApi<PokemonListResponse>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
}

/**
 * Total de Pokémon disponibles. Se consulta con `limit=1` (respuesta mínima y
 * cacheada) para acotar la paginación y construir mensajes con el dato real.
 */
export async function getPokemonCount(): Promise<number> {
  const listing = await fetchPokeApi<PokemonListResponse>("/pokemon?limit=1");
  return listing.count;
}

export async function getPokemonList(page: number): Promise<PokemonCatalog> {
  const requestedPage = Number.isFinite(page) ? Math.max(1, Math.floor(page)) : 1;
  const firstPage = await fetchListing(requestedPage);
  const totalPages = Math.max(1, Math.ceil(firstPage.count / PAGE_SIZE));
  const safePage = Math.min(requestedPage, totalPages);

  // Solo se repite la consulta cuando la página pedida estaba fuera de rango.
  const listing = safePage === requestedPage ? firstPage : await fetchListing(safePage);

  return {
    count: listing.count,
    items: await Promise.all(listing.results.map(getPokemonCard)),
    page: safePage,
    totalPages,
  };
}

export async function getPokemonByQuery(query: string): Promise<PokemonCardData | null> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) {
    return null;
  }

  try {
    const detail = await getPokemon(normalized);
    return toCardData(detail);
  } catch {
    return null;
  }
}

export async function getPokemon(identifier: string | number): Promise<PokemonDetail> {
  const value = encodeURIComponent(String(identifier).trim().toLowerCase());
  return fetchPokeApi<PokemonDetail>(`/pokemon/${value}`);
}

export async function getPokemonSpecies(identifier: string | number): Promise<PokemonSpeciesDetail> {
  const value = encodeURIComponent(String(identifier).trim().toLowerCase());
  return fetchPokeApi<PokemonSpeciesDetail>(`/pokemon-species/${value}`);
}

async function getPokemonCard(resource: NamedApiResource): Promise<PokemonCardData> {
  const detail = await getPokemon(getPokemonIdFromUrl(resource.url));
  return toCardData(detail);
}

function toCardData(detail: PokemonDetail): PokemonCardData {
  return {
    id: detail.id,
    name: detail.name,
    image: detail.sprites.other?.["official-artwork"]?.front_default ?? detail.sprites.front_default ?? "",
    types: detail.types.map(({ type }) => type.name),
  };
}
