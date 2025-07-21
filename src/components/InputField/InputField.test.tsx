import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InputField } from './InputField';

test('Should render InputField', async () => {
  render(<InputField value={''} onChange={() => {}} placeholder="ditto" />);

  const input = screen.getByPlaceholderText(/ditto/i);

  expect(input).toBeInTheDocument();
});
