import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Container from './components/Container/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './constants';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path={APP_ROUTES.HOME} element={<Container />} />
          <Route path={APP_ROUTES.ABOUT} />
          <Route path={APP_ROUTES.DETAILS__TEMPLATE} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
