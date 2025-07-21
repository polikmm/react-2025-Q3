import { Component, type ErrorInfo } from 'react';
import type { ErrorBoundaryProps } from '../../types/ErrorBoundaryProps';
import type { ErrorBoundaryState } from '../../types/ErrorBoundaryState';
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2 data-testid="error">
            Oops! Something went wrong. Please try again later.
          </h2>
        </>
      );
    }

    return this.props.children;
  }
}
