import { Component } from 'react';
import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Container from './components/Container/Container';
export default class App extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Container />
      </ErrorBoundary>
    );
  }
}
