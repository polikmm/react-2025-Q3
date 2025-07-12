import type { CardItem } from "./CardItem";

export type AppState = {
  data: CardItem[];
  prevQuery: string;
  query: string;
  error: string;
}