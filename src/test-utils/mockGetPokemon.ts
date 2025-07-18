export const mockGetPokemon = jest.fn(() => Promise.resolve({
  name: "ditto",
  base_experience: 101,
  height: 3,
  weight: 40,
}));