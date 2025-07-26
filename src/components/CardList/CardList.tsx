import { Card } from '../Card/Card';
import './styles.css';
import type { CardListProp } from '../../types/CardListProp';
import { Button } from '../Button/Button';
import { Pagination } from '../Pagination/Pagination';

export default function CardList({
  data,
  handleThrowError,
  onSearch,
  page,
}: CardListProp) {
  return (
    <>
      <div className="cardList" data-testid="cardList">
        {data.length > 0 ? (
          data.map((item) => (
            <Card
              id={item.id}
              key={item.name}
              name={item.name}
              base_experience={item.base_experience}
              height={item.height}
              weight={item.weight}
            />
          ))
        ) : (
          <h3 className="warning">No matching results!</h3>
        )}
      </div>
      <Button
        className="error-button"
        onClick={handleThrowError}
        text="error"
      />
      <Pagination onSearch={onSearch} page={page} />
    </>
  );
}
