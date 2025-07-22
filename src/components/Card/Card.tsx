import { CardMeta } from '../CardMeta/CardMeta';
import type { CardItem } from '../../types/CardItem';
import './styles.css';

export function Card({ name, base_experience, height, weight }: CardItem) {
  return (
    <div className="card" data-testid="card">
      <h2 className="cardTitle">{name}</h2>
      <CardMeta data={{ name, base_experience, height, weight }} />
    </div>
  );
}
