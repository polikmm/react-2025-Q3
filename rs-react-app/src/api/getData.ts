import { getPokemon } from "./getPokemon";

export async function getData(url: string = "https://pokeapi.co/api/v2/pokemon/?page=1") {
  const response = await fetch(url).then((res) => res.json());
  const names = response.results.map((item: { name: string, url: string }) => item.name);;
  const data = await Promise.all(names.map((name: string) => getPokemon(name)));

  return data;
}