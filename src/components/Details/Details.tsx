import { useNavigate, useParams } from 'react-router-dom';
import type { CardItem } from '../../types/CardItem';
import { useEffect, useState } from 'react';
import { getPokemon } from '../../api/getPokemon';
import { Button } from '../Button/Button';
import './style.css';

export default function Details() {
  const { id } = useParams();
  const { page } = useParams();
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<CardItem | null>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(`/page/${page}`);
  };
  useEffect(() => {
    if (id) {
      setLoading(true);
      getPokemon(id)
        .then(setData)
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (isLoading) return <div className="p-4">Loading details...</div>;
  if (!data) return <div className="p-4">Not found</div>;
  return (
    <div className="details" data-testid="details">
      <div>
        <h2>{data.name}</h2>
        {data.image && (
          <img className="image" src={data.image} alt={data.name} />
        )}
      </div>

      <div>
        <div>
          <strong>Base XP:</strong> {data.base_experience}
        </div>
        <div>
          <strong>Height:</strong> {+data.height / 10} m
        </div>
        <div>
          <strong>Weight:</strong> {+data.weight / 10} kg
        </div>
        <div>
          <strong>Types:</strong> {data.types && data.types.join(', ')}
        </div>
      </div>

      <div>
        <h3>Stats</h3>
        <ul>
          {data.stats &&
            data.stats.map((stat: { name: string; value: number }) => (
              <li key={stat.name}>
                <span>{stat.name}</span>
                <span>{stat.value}</span>
              </li>
            ))}
        </ul>
      </div>
      <Button className="close" onClick={handleClose} text="&#65794;" />
    </div>
  );
}
