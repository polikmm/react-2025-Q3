import { Card } from '../Card/Card';
import './styles.css';
import type { CardListProp } from '../../types/CardListProp';
import { Button } from '../Button/Button';

export default function CardList({ data, handleThrowError }: CardListProp) {
  return (
    <>
      <div className="cardList" data-testid="cardList">
        {data.length > 0 &&
          data.map((item) => (
            <Card
              key={item.name}
              name={item.name}
              base_experience={item.base_experience}
              height={item.height}
              weight={item.weight}
            />
          ))}
      </div>
      <Button onClick={handleThrowError} text="error" />
    </>
  );
}
