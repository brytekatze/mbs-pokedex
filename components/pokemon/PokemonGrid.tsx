import type { PokemonCardData } from '@/types/pokemon';
import PokemonCard from './PokemonCard';

export default function PokemonGrid({ items }: { items: PokemonCardData[] }): React.ReactElement {
  return <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">{items.map((pokemon) => <PokemonCard key={pokemon.id} pokemon={pokemon} />)}</div>;
}
