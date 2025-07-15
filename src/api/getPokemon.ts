export async function getPokemon(query: string) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);

  if (!response.ok) {
    console.error(`${response.status}: ${response.statusText}`);
    throw new Error();
  }

  const data = await response.json();
  const { name, base_experience, height, weight } = data;
  return { name, base_experience, height, weight };
}
