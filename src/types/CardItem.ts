export type CardItem = {
  id: string;
  name: string;
  base_experience: string;
  height: string;
  weight: string;
  image?: string;
  types?: string[];
  stats?: { name: string; value: number }[];
};
