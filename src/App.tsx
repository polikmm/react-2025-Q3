import './App.css';
import Container from './components/Container/Container';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Author from './components/Author/Author';
import Details from './components/Details/Details';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/page/1" replace />} />
        <Route path="page/:page" element={<Container />}>
          <Route index element={<div />} />
          <Route path="details/:id" element={<Details />} />
        </Route>
        <Route path="/about" element={<Author />} />
      </Routes>
    </BrowserRouter>
  );
}
