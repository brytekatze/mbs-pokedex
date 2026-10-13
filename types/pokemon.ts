export interface NamedApiResource {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
}

export interface PokemonSprites {
  front_default: string | null;
  other?: {
    'official-artwork'?: {
      front_default: string | null;
    };
  };
}

export interface PokemonAbility {
  ability: NamedApiResource;
  is_hidden: boolean;
  slot: number;
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
}

export interface PokemonType {
  slot: number;
  type: NamedApiResource;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number | null;
  weight: number | null;
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: PokemonType[];
  species: NamedApiResource;
}

export interface PokemonSpeciesFlavorText {
  flavor_text: string;
  language: NamedApiResource;
}

export interface PokemonSpeciesDetail {
  flavor_text_entries: PokemonSpeciesFlavorText[];
}

export interface PokemonCardData {
  id: number;
  name: string;
  image: string;
  types: string[];
}

export interface PokemonCatalog {
  count: number;
  items: PokemonCardData[];
  page: number;
  totalPages: number;
}
