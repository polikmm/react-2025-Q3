export async function getPokemon(query: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!response.ok) {
    console.error(`${response.status}: ${response.statusText}`);
    throw new Error('Failed to fetch Pokémon data');
  }

  const data = await response.json();

  const { id, name, base_experience, height, weight, sprites, types, stats } =
    data;

  return {
    id,
    name,
    base_experience,
    height,
    weight,
    image: sprites.front_default,
    types: types.map((t: { type: { name: string } }) => t.type.name),
    stats: stats.map((s: { stat: { name: string }; base_stat: number }) => ({
      name: s.stat.name,
      value: s.base_stat,
    })),
  };
}
