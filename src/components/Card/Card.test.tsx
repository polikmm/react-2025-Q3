import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

test('Should render CardList with data', async () => {
  render(
    <Card name="polikmm" base_experience="junior" height="166" weight="56" />
  );

  const card = screen.getByTestId('card');
  const name = screen.getByText('polikmm');
  const base_experience = screen.getByText('junior');
  const height = screen.getByText('166');
  const weight = screen.getByText('56');

  expect(card).toBeInTheDocument();
  expect(name).toBeInTheDocument();
  expect(base_experience).toBeInTheDocument();
  expect(height).toBeInTheDocument();
  expect(weight).toBeInTheDocument();
});
