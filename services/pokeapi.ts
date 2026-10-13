import type {
  NamedApiResource,
  PokemonCatalog,
  PokemonCardData,
  PokemonDetail,
  PokemonListResponse,
  PokemonSpeciesDetail,
} from '@/types/pokemon';
import { getPokemonIdFromUrl } from '@/lib/utils';

const API_URL = 'https://pokeapi.co/api/v2';
export const PAGE_SIZE = 24;

async function fetchPokeApi<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`PokéAPI respondió con ${response.status} para ${path}`);
  }
  return response.json() as Promise<T>;
}

export async function getPokemonList(page: number): Promise<PokemonCatalog> {
  const safePage = Math.max(1, page);
  const offset = (safePage - 1) * PAGE_SIZE;
  const listing = await fetchPokeApi<PokemonListResponse>(`/pokemon?limit=${PAGE_SIZE}&offset=${offset}`);
  const items = await Promise.all(listing.results.map(getPokemonCard));
  return {
    count: listing.count,
    items,
    page: safePage,
    totalPages: Math.ceil(listing.count / PAGE_SIZE),
  };
}

export async function getPokemonByQuery(query: string): Promise<PokemonCardData | null> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return null;
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
    image: detail.sprites.other?.['official-artwork']?.front_default ?? detail.sprites.front_default ?? '',
    types: detail.types.map(({ type }) => type.name),
  };
}
