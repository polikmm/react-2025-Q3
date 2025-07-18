import { mockGetData } from '../../test-utils/mockGetData';
import { mockGetPokemon } from '../../test-utils/mockGetPokemon';

jest.mock('../../api/getData', () => ({
  __esModule: true,
  getData: mockGetData,
}));

jest.mock('../../api/getPokemon', () => ({
  __esModule: true,
  getPokemon: mockGetPokemon,
}));

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container';
import userEvent from '@testing-library/user-event';
import type { CardListProp } from '../../types/CardListProp';

jest.mock('../CardList/CardList', () => ({
  __esModule: true,
  default: ({ data, handleThrowError }: CardListProp) => (
    <div data-testid="cardList">
      CardList with {data.length} items
      <button onClick={() => handleThrowError()}>error</button>
    </div>
  ),
}));

jest.mock('../../api/getData', () => ({
  __esModule: true,
  getData: mockGetData,
}));

jest.mock('../../api/getPokemon', () => ({
  __esModule: true,
  getPokemon: mockGetPokemon,
}));

describe('Main should', () => {
  it('be rendered and fetches data', async () => {
    render(<Container />);

    const container = screen.getByTestId('container');

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId("cardList")).toBeInTheDocument();
    })

    expect(mockGetData).toHaveBeenCalledTimes(1);
  });

  it('update query on input change', async () => {
    render(<Container />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'ditto');

    expect(input).toHaveValue('ditto');
  });

  it('calls getPokemon when search is triggered with query', async () => {
    render(<Container />);

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /search/i });

    await userEvent.type(input, 'ditto');
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('cardList')).toBeInTheDocument();
    });

    expect(mockGetPokemon).toHaveBeenCalledWith('ditto');
  });
});
