import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Container from './components/Container/Container';

export default function App() {
  return (
    <ErrorBoundary>
      <Container />
    </ErrorBoundary>
  );
}
