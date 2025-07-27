import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Pagination } from './Pagination';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';

describe('Paginaiton should', () => {
  const navigate = jest.fn();

  beforeEach(() => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
  });
  it('be rendered', () => {
    render(
      <MemoryRouter>
        <Pagination onSearch={jest.fn()} page={1} />
      </MemoryRouter>
    );
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });

  it('call onSearch & navigate to the prev page', () => {
    const mockOnSearch = jest.fn();

    render(
      <MemoryRouter>
        <Pagination page={3} onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '←' }));

    expect(mockOnSearch).toHaveBeenCalledWith('', 2);
    expect(navigate).toHaveBeenCalledWith('/page/2');
  });

  it('call onSearch & navigate to the next page', () => {
    const mockOnSearch = jest.fn();

    render(
      <MemoryRouter>
        <Pagination page={3} onSearch={mockOnSearch} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '→' }));

    expect(mockOnSearch).toHaveBeenCalledWith('', 4);
    expect(navigate).toHaveBeenCalledWith('/page/4');
  });
});
