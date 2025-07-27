import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from './Card';
import { MemoryRouter } from 'react-router-dom';
import * as router from 'react-router';
import userEvent from '@testing-library/user-event';

describe('Card should', () => {
  it('be rendered CardList with data', async () => {
    render(
      <MemoryRouter>
        <Card
          id="id"
          name="polikmm"
          base_experience="junior"
          height="166"
          weight="56"
        />
      </MemoryRouter>
    );

    const card = screen.getByTestId('card');
    const name = screen.getByText('polikmm');
    const base_experience = screen.getByText('junior');
    const height = screen.getByText('166');
    const weight = screen.getByText('56');

    expect(card).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(base_experience).toBeInTheDocument();
    expect(height).toBeInTheDocument();
    expect(weight).toBeInTheDocument();
  });

  it('navigate with correct argument && not bubbling', async () => {
    const navigate = jest.fn();
    const params = jest.fn().mockReturnValue({ page: '1' });
    const parentHandler = jest.fn();

    jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
    jest.spyOn(router, 'useParams').mockImplementation(params);

    render(
      <MemoryRouter>
        <div onClick={parentHandler}>
          <Card
            id="id"
            name="polikmm"
            base_experience="junior"
            height="166"
            weight="56"
          />
        </div>
      </MemoryRouter>
    );

    const card = screen.getByTestId('card');

    await userEvent.click(card);

    expect(navigate).toHaveBeenCalledWith('/page/1/details/id');
    expect(parentHandler).not.toHaveBeenCalled();
  });
});
