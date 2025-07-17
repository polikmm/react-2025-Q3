import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';
import userEvent from '@testing-library/user-event';

describe('SearchBar', () => {
  let mockOnChange: jest.Mock;
  let mockOnSearch: jest.Mock;

  function renderSearchBar(value = '') {
    mockOnChange = jest.fn();
    mockOnSearch = jest.fn();
    render(
      <SearchBar
        value={value}
        onChange={mockOnChange}
        onSearch={mockOnSearch}
      />
    );
  }

  beforeEach(() => {
    localStorage.clear();
    renderSearchBar();
  });

  it('should be rendered', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('should show empty input in case of empty LS', () => {
    expect(screen.getByPlaceholderText(/ditto/i)).toHaveValue('');
  });

  it('should call onChange function when the input value changes', async () => {
    const input = screen.getByPlaceholderText(/ditto/i);
    await userEvent.type(input, 'te');
    expect(mockOnChange).toHaveBeenCalled();
  });

  it('should call onSearch function when the button is clicked', async () => {
    const button = screen.getByRole('button');
    await userEvent.click(button);
    expect(mockOnSearch).toHaveBeenCalled();
  });
});
