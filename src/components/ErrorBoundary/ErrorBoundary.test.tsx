import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from './ErrorBoundary';
import '@testing-library/jest-dom';

function ProblemComponent() {
  throw new Error('test error');
  return null;
}

test('Should show message in case of error in child component', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});

  render(
    <ErrorBoundary>
      <ProblemComponent />
    </ErrorBoundary>
  );

  const message = screen.getByText(
    'Oops! Something went wrong. Please try again later.'
  );

  expect(message).toBeInTheDocument();
});
