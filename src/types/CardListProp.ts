import type { CardItem } from './CardItem';

export type CardListProp = {
  data: CardItem[];
  handleThrowError: () => void;
  onSearch: (query: string, page: number) => void;
  page: number;
};
