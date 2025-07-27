import { MemoryRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('NotFoundPage should', () => {
  it('be rendered', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Error 404: non-existing page!')
    ).toBeInTheDocument();
  });
});
