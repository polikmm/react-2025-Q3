import { mockGetData } from '../../test-utils/mockGetData';
import { mockGetPokemon } from '../../test-utils/mockGetPokemon';

jest.mock('../../api/getData', () => ({
  getData: mockGetData,
}));

jest.mock('../../api/getPokemon', () => ({
  getPokemon: mockGetPokemon,
}));

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Container from './Container';
import userEvent from '@testing-library/user-event';
import { ErrorBoundary } from '../ErrorBoundary/ErrorBoundary';
import * as pokemonApi from '../../api/getPokemon';
import * as api from '../../api/getData';

jest.mock('../../api/getData', () => ({
  __esModule: true,
  getData: mockGetData,
}));

jest.mock('../../api/getPokemon', () => ({
  __esModule: true,
  getPokemon: mockGetPokemon,
}));

describe('Container should', () => {
  it('be rendered and fetches data', async () => {
    render(<Container />);

    const container = screen.getByTestId('container');

    expect(container).toBeInTheDocument();
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('cardList')).toBeInTheDocument();
    });

    expect(mockGetData).toHaveBeenCalledTimes(1);
  });

  it('update query on input change', async () => {
    render(<Container />);

    const input = screen.getByRole('textbox');

    await userEvent.type(input, 'ditto');

    expect(input).toHaveValue('ditto');
  });

  it('call getPokemon when search is triggered with query', async () => {
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

  it('throw and show fallback when getPokemon rejects', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest
      .spyOn(pokemonApi, 'getPokemon')
      .mockRejectedValue(new Error('Test error'));

    localStorage.setItem('query', 'pikachu');

    render(
      <ErrorBoundary>
        <Container />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('throw and show fallback when getData rejects', async () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(api, 'getData').mockRejectedValue(new Error('Test error'));

    localStorage.setItem('query', 'pikachu');

    render(
      <ErrorBoundary>
        <Container />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });

  it('set error state to "Unknown error" if thrown error is not an instance of Error', async () => {
  jest.spyOn(pokemonApi, 'getPokemon').mockRejectedValue('some unknown error');

  localStorage.setItem('query', 'pikachu');

  const errorConsoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <Container />
    </ErrorBoundary>
  );

  await waitFor(() => {
    expect(screen.getByTestId('error')).toBeInTheDocument();
  });

  expect(errorConsoleSpy).toHaveBeenCalledWith('Unknown error:', 'some unknown error');

  errorConsoleSpy.mockRestore();
});

  it('throw error when click on error button', async () => {
    render(
      <ErrorBoundary>
        <Container />
      </ErrorBoundary>
    );

    await waitFor(() => {
      expect(screen.getByTestId('cardList')).toBeInTheDocument();
    });

    const button = screen.getByRole('button', { name: /error/i });
    await userEvent.click(button);

    await waitFor(() => {
      expect(screen.getByTestId('error')).toBeInTheDocument();
    });
  });
});
