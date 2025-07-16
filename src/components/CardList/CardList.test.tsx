import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';

test('Should render CardList', async () => {
  render(<CardList data={[]} handleThrowError={() => {}} />);

  const cardList = screen.getByTestId('cardList');

  expect(cardList).toBeInTheDocument();
});
