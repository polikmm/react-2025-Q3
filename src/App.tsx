import './App.css';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import Container from './components/Container/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { APP_ROUTES } from './constants';
import Author from './components/Author/Author';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route
            index
            path={APP_ROUTES.HOME__TEMPLATE}
            element={<Container />}
          />
          <Route path={APP_ROUTES.ABOUT} element={<Author />} />
          <Route path={APP_ROUTES.DETAILS__TEMPLATE} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
