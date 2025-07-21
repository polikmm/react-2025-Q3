import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';
import { userEvent } from '@testing-library/user-event';

test('Should render CardList', () => {
  render(<CardList data={[]} handleThrowError={() => {}} />);

  const cardList = screen.getByTestId('cardList');

  expect(cardList).toBeInTheDocument();
});

test('Should not render Cards if data does not exist', () => {
  render(<CardList data={[]} handleThrowError={() => {}} />);

  const cardList = screen.getByTestId('cardList');
  const card = screen.queryByTestId('card');

  expect(cardList).toBeInTheDocument();
  expect(card).not.toBeInTheDocument();
});

test('Should render Cards if data exists', () => {
  render(
    <CardList
      data={[
        {
          name: 'test',
          base_experience: 'test',
          height: 'test',
          weight: 'test',
        },
      ]}
      handleThrowError={() => {}}
    />
  );

  const cardList = screen.getByTestId('cardList');
  const card = screen.getByTestId('card');

  expect(cardList).toBeInTheDocument();
  expect(card).toBeInTheDocument();
});

test('Should call onClick function when click on test-error-button', async () => {
  const mockThrowError = jest.fn();

  render(<CardList data={[]} handleThrowError={mockThrowError} />);

  const button = screen.getByRole('button');

  await userEvent.click(button);

  expect(mockThrowError).toHaveBeenCalled();
});
