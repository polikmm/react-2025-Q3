import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SearchBar } from './SearchBar';

test('Should render SearchBar', () => {
  render(<SearchBar value={''} onChange={jest.mock} onSearch={() => {}} />);

  const input = screen.getByRole('textbox');
  expect(input).toBeInTheDocument();

  const button = screen.getByRole('button');
  expect(button).toBeInTheDocument();
});

test('Should show empty input in case of empty LS', () => {
  render(<SearchBar value={''} onChange={jest.mock} onSearch={() => {}} />);
  localStorage.clear();

  const input = screen.getByPlaceholderText(/ditto/i);
  expect(input).toHaveValue('');
});
