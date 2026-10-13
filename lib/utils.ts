export function formatPokemonId(id: number): string {
  return `#${String(id).padStart(4, '0')}`;
}

export function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function getPokemonIdFromUrl(url: string): number {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  if (!match) {
    throw new Error(`No se pudo obtener el ID desde la URL de Pokémon: ${url}`);
  }
  return Number(match[1]);
}

export function cleanFlavorText(value: string): string {
  return value.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim();
}
