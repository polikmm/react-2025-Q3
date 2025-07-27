import './App.css';
import Main from './components/Main/Main';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Author from './components/Author/Author';
import Details from './components/Details/Details';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Navigate to="/page/1" replace />} />
          <Route path="page/:page" element={<Main />}>
            <Route index element={<div />} />
            <Route path="details/:id" element={<Details />} />
          </Route>
          <Route path="/about" element={<Author />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
