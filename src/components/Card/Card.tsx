import { CardMeta } from '../CardMeta/CardMeta';
import type { CardItem } from '../../types/CardItem';
import './styles.css';
import { useNavigate, useParams } from 'react-router-dom';

export function Card({ id, name, base_experience, height, weight }: CardItem) {
  const navigate = useNavigate();
  const { page } = useParams();
  const handleClick = (event: React.MouseEvent<HTMLDivElement>, id: string) => {
    event?.stopPropagation();
    navigate(`/page/${page}/details/${id}`);
  };
  return (
    <div
      className="card"
      data-testid="card"
      id={id}
      onClick={(e) => handleClick(e, id)}
    >
      <h2 className="cardTitle">{name}</h2>
      <CardMeta data={{ id, name, base_experience, height, weight }} />
    </div>
  );
}
