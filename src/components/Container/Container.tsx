import { Suspense, lazy, useEffect, useState } from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { getData } from '../../api/getData';
import { getPokemon } from '../../api/getPokemon';
import type { CardItem } from '../../types/CardItem';
import { useParams } from 'react-router-dom';

const LazyComponent = lazy(() => import('../CardList/CardList'));
export default function Container() {
  const [data, setData] = useState<CardItem[]>([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const { page } = useParams();
  const [currentPage, setCurrentPage] = useState(parseInt(page || '1', 10));

  useEffect(() => {
    const savedQuery = localStorage.getItem('query') || '';
    setQuery(savedQuery);
    handleSearch(savedQuery, currentPage);
  }, []);

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  const handleSearch = async (query: string, page: number = 1) => {
    try {
      const currentQuery = query.trim().toLowerCase();
      localStorage.setItem('query', currentQuery);

      if (currentQuery) {
        const result = await getPokemon(currentQuery);
        setData([result]);
      } else {
        const result = await getData(page);
        setCurrentPage(page);
        setData(result);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Error:', err.message);
        setError(err.message);
      } else {
        console.error('Unknown error:', err);
        setError('Unknown error');
      }
    }
  };

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  return (
    <div data-testid="container">
      <header className="header">
        <SearchBar
          value={query}
          onChange={handleQueryChange}
          onSearch={() => handleSearch(query)}
        />
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent
          data={data}
          handleThrowError={() => setError('test error')}
          onSearch={handleSearch}
          page={currentPage}
        />
      </Suspense>
    </div>
  );
}
