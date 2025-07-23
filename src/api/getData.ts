import { getPokemon } from './getPokemon';

export async function getData(page: number) {
  const limit = 8;
  const offset = (page - 1) * limit;
  const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);

  if (!response.ok) {
    console.error(`${response.status}: ${response.statusText}`);
    throw new Error();
  }

  const results = await response.json();
  const names = results.results.map(
    (item: { name: string; url: string }) => item.name
  );
  const data = await Promise.all(names.map((name: string) => getPokemon(name)));

  return data;
}
