import { getPokemon } from "./getPokemon";

export async function getData(url: string = "https://pokeapi.co/api/v2/pokemon/?limit=12") {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  }

  const results = await response.json();
  const names = results.results.map((item: { name: string, url: string }) => item.name);;
  const data = await Promise.all(names.map((name: string) => getPokemon(name)));

  return data;
}