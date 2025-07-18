import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
// import userEvent from '@testing-library/user-event';
import Container from './Container';

describe('Main should', () => {
  it('be rendered', () => {
    render(<Container />);

    const container = screen.getByTestId('container');

    expect(container).toBeInTheDocument();
  });
});
