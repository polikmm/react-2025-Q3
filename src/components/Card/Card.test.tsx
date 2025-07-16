import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';

test('Should render CardList', async () => {
  render(<Card name="" base_experience="" height="" weight="" />);

  const card = screen.getByTestId('card');

  expect(card).toBeInTheDocument();
});
