export async function getPokemon(query: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  const data = await response.json();
  const { name, base_experience, height, weight } = data;

  return { name, base_experience, height, weight };
}
