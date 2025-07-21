import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

test('Should render ButtonList', async () => {
  render(<Button onClick={() => {}} text="" />);

  const button = screen.getByRole('button');

  expect(button).toBeInTheDocument();
});
