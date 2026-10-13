import { notFound } from 'next/navigation';
import PokemonDetailView from '@/components/pokemon/PokemonDetailView';
import { getPokemon, getPokemonSpecies } from '@/services/pokeapi';

export default async function PokemonPage({ params }: { params: Promise<{ id: string }> }): Promise<React.ReactElement> {
  const { id } = await params;
  const result = await getPokemon(id)
    .then(async (pokemon) => ({ pokemon, species: await getPokemonSpecies(pokemon.species.name) }))
    .catch(() => null);
  if (!result) notFound();
  return <PokemonDetailView pokemon={result.pokemon} species={result.species} />;
}
