import { mockGetPokemon } from '../../test-utils/mockGetPokemon';

jest.mock('../../api/getPokemon', () => ({
  __esModule: true,
  getPokemon: mockGetPokemon,
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Details from './Details';
import * as pokemonApi from '../../api/getPokemon';
import '@testing-library/jest-dom';
import * as router from 'react-router';
import { MemoryRouter } from 'react-router';

describe('Details component should', () => {
  const navigate = jest.fn();
  const params = jest.fn().mockReturnValue({ id: '25', page: '2' });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(router, 'useParams').mockImplementation(params);
  });

  it('return "Not found" when data doesn\'t exist', async () => {
    jest
      .spyOn(pokemonApi, 'getPokemon')
      .mockResolvedValue(
        null as unknown as ReturnType<
          typeof pokemonApi.getPokemon
        > extends Promise<infer T>
          ? T
          : never
      );
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText('Not found')).toBeInTheDocument();
    });
  });

  it('show pokemon data', async () => {
    jest.spyOn(pokemonApi, 'getPokemon').mockResolvedValue({
      id: 1,
      name: 'pikachu',
      image: 'pikachu.png',
      base_experience: 112,
      height: 4,
      weight: 60,
      types: ['electric'],
      stats: [
        { name: 'hp', value: 35 },
        { name: 'attack', value: 55 },
      ],
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    expect(await screen.findByText('pikachu')).toBeInTheDocument();
    expect(screen.getByAltText('pikachu')).toHaveAttribute(
      'src',
      'pikachu.png'
    );
    expect(screen.getByText('Base XP:')).toBeInTheDocument();
    expect(screen.getByText('112')).toBeInTheDocument();
    expect(screen.getByText('0.4 m')).toBeInTheDocument();
    expect(screen.getByText('6 kg')).toBeInTheDocument();
    expect(screen.getByText('electric')).toBeInTheDocument();
    expect(screen.getByText('hp')).toBeInTheDocument();
    expect(screen.getByText('35')).toBeInTheDocument();
  });

  it('render loader and then data', async () => {
    jest.spyOn(pokemonApi, 'getPokemon').mockResolvedValue({
      id: 1,
      name: 'pikachu',
      image: '',
      base_experience: 112,
      height: 4,
      weight: 60,
      types: [],
      stats: [],
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading details.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByTestId('details')).toHaveTextContent('pikachu');
    });
  });

  it('navigate by the click on close button', async () => {
    jest.spyOn(pokemonApi, 'getPokemon').mockResolvedValue({
      id: 1,
      name: 'pikachu',
      image: '',
      base_experience: 112,
      height: 4,
      weight: 60,
      types: [],
      stats: [],
    });

    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    const button = await screen.findByRole('button');
    fireEvent.click(button);

    expect(navigate).toHaveBeenCalledWith('/page/2');
  });

  it('call getPokemon if id exist', async () => {
    const params = jest.fn().mockReturnValue({ id: '1' });
    jest.spyOn(router, 'useParams').mockImplementation(params);
    const getPokemonSpy = jest
      .spyOn(pokemonApi, 'getPokemon')
      .mockResolvedValue({
        id: 1,
        name: 'pikachu',
        image: '',
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [],
        stats: [],
      });
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPokemonSpy).toHaveBeenCalled();
    });
  });

  it('not call getPokemon if id not exist', async () => {
    const params = jest.fn().mockReturnValue({});
    jest.spyOn(router, 'useParams').mockImplementation(params);
    const getPokemonSpy = jest
      .spyOn(pokemonApi, 'getPokemon')
      .mockResolvedValue({
        id: 1,
        name: 'pikachu',
        image: '',
        base_experience: 112,
        height: 4,
        weight: 60,
        types: [],
        stats: [],
      });
    render(
      <MemoryRouter>
        <Details />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(getPokemonSpy).not.toHaveBeenCalled();
    });
  });
});
