import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardMeta } from './CardMeta';

test('Should render CardMeta', async () => {
  render(
    <CardMeta
      data={{
        name: '',
        base_experience: '',
        height: '',
        weight: '',
      }}
    />
  );

  const data = screen.getByTestId('cardMeta');

  expect(data).toBeInTheDocument();
});
