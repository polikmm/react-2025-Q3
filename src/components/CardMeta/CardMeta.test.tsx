import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardMeta } from './CardMeta';

describe('CardMeta should', () => {
  test('be rendered', async () => {
    render(
      <CardMeta
        data={{
          id: '',
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

  test('render subcomponents', async () => {
    render(
      <CardMeta
        data={{
          id: 'id',
          name: 'polikmm',
          base_experience: 'junior',
          height: '166',
          weight: '56',
        }}
      />
    );

    const base_experience = screen.getByText('junior');
    const height = screen.getByText('166');
    const weight = screen.getByText('56');

    expect(base_experience).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
  });
});
